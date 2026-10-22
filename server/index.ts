import dotenv from 'dotenv';
dotenv.config({ path: process.env.DOTENV_CONFIG_PATH || 'server/.env' });
import { randomUUID } from 'node:crypto';
import { extname } from 'node:path';
import express, { type ErrorRequestHandler } from 'express';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import multer from 'multer';
import { GridFSBucket, MongoClient, ObjectId } from 'mongodb';

export const app = express();
const port = Number(process.env.PORT || 8787);
const mongoUri = process.env.MONGODB_URI;
const databaseName = process.env.MONGODB_DB || 'firstcut_studios';
const allowedOrigins = (process.env.ALLOWED_ORIGINS || '').split(',').map((value) => value.trim()).filter(Boolean);
const client = mongoUri ? new MongoClient(mongoUri) : undefined;
let database: Awaited<ReturnType<NonNullable<typeof client>['db']>> | undefined;
let bucket: GridFSBucket | undefined;

app.disable('x-powered-by');
app.use(helmet());
app.use((req, res, next) => {
  const origin = req.get('origin');
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }
  if (req.method === 'OPTIONS') return res.sendStatus(204);
  next();
});

const inquiryLimiter = rateLimit({ windowMs: 15 * 60 * 1000, limit: 8, standardHeaders: 'draft-8', legacyHeaders: false });
const allowedTypes = new Set(['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'video/mp4', 'video/quicktime', 'application/zip']);
const matchesSignature = (file: Express.Multer.File) => {
  const bytes = file.buffer;
  const starts = (...signature: number[]) => signature.every((value, index) => bytes[index] === value);
  switch (file.mimetype) {
    case 'image/jpeg': return starts(0xff, 0xd8, 0xff);
    case 'image/png': return starts(0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a);
    case 'image/webp': return bytes.toString('ascii', 0, 4) === 'RIFF' && bytes.toString('ascii', 8, 12) === 'WEBP';
    case 'application/pdf': return bytes.toString('ascii', 0, 5) === '%PDF-';
    case 'video/mp4':
    case 'video/quicktime': return bytes.toString('ascii', 4, 8) === 'ftyp';
    case 'application/zip': return starts(0x50, 0x4b, 0x03, 0x04) || starts(0x50, 0x4b, 0x05, 0x06) || starts(0x50, 0x4b, 0x07, 0x08);
    default: return false;
  }
};
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { files: 4, fileSize: 4 * 1024 * 1024, fields: 20, fieldSize: 12 * 1024, parts: 25 },
  fileFilter: (_req, file, done) => {
    if (!allowedTypes.has(file.mimetype)) return done(new Error('Unsupported attachment type. Use JPG, PNG, WebP, PDF, MP4, MOV, or ZIP.'));
    done(null, true);
  },
});

app.get('/api/health', async (_req, res) => {
  await databaseReady;
  res.status(database ? 200 : 503).json({ ok: Boolean(database), storage: database ? 'mongodb' : 'not-configured' });
});

app.post('/api/inquiries', inquiryLimiter, upload.array('files', 4), async (req, res, next) => {
  await databaseReady;
  const files = (req.files || []) as Express.Multer.File[];
  if (files.reduce((total, file) => total + file.size, 0) > 4 * 1024 * 1024) return res.status(400).json({ error: 'Attachments must total 4 MB or less.' });
  if (files.some((file) => !matchesSignature(file))) return res.status(400).json({ error: 'An attachment did not match its file type. Please choose a supported image, PDF, video, or ZIP file.' });
  const fields = ['name', 'email', 'brand', 'type', 'platform', 'duration', 'budget', 'deadline', 'desc', 'refs', 'pkg', 'free'] as const;
  const data = Object.fromEntries(fields.map((key) => [key, typeof req.body[key] === 'string' ? req.body[key].trim().slice(0, 4000) : '']));
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email);
  if (!data.name || data.name.length > 160 || !emailOk || !data.type || data.desc.length < 10) {
    return res.status(400).json({ error: 'Please provide a name, valid email, project type, and project description of at least 10 characters.' });
  }
  if (!database || !bucket) return res.status(503).json({ error: 'Inquiry storage is not configured yet. Please use the email fallback.' });

  const stored: ObjectId[] = [];
  try {
    const attachments = await Promise.all(files.map(async (file) => {
      const id = new ObjectId();
      const safeName = `${randomUUID()}${extname(file.originalname).slice(0, 12)}`;
      await new Promise<void>((resolve, reject) => {
        const stream = bucket!.openUploadStreamWithId(id, safeName, {
          metadata: { originalName: file.originalname.slice(0, 240), contentType: file.mimetype, size: file.size },
        });
        stream.on('error', reject);
        stream.on('finish', resolve);
        stream.end(file.buffer);
      });
      stored.push(id);
      return { id, name: file.originalname.slice(0, 240), type: file.mimetype, size: file.size };
    }));

    await database.collection('inquiries').insertOne({
      ...data,
      free: data.free === 'true',
      attachments,
      status: 'new',
      createdAt: new Date(),
      source: 'website',
    });
    res.status(201).json({ ok: true, message: 'Inquiry received.' });
  } catch (error) {
    await Promise.allSettled(stored.map((id) => bucket!.delete(id)));
    next(error);
  }
});

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof multer.MulterError) {
    const message = error.code === 'LIMIT_FILE_SIZE' ? 'Each attachment must be 4 MB or smaller.' : 'You can attach up to four files.';
    return res.status(400).json({ error: message });
  }
  if (error instanceof Error && error.message.startsWith('Unsupported attachment type')) return res.status(400).json({ error: error.message });
  console.error('Inquiry API error:', error instanceof Error ? error.message : 'Unknown error');
  res.status(500).json({ error: 'We could not save your inquiry. Please try again or email us directly.' });
};
app.use(errorHandler);

export const databaseReady: Promise<void> = client
  ? client.connect().then(() => {
      database = client.db(databaseName);
      bucket = new GridFSBucket(database, { bucketName: 'inquiry_uploads' });
      console.log(`Inquiry API connected to MongoDB database "${databaseName}".`);
    }).catch((error: unknown) => {
      console.error('MongoDB connection failed:', error instanceof Error ? error.message : 'Unknown error');
    })
  : Promise.resolve().then(() => console.warn('MONGODB_URI is not set. Inquiry submissions will use the frontend email fallback.'));

const isServerless = Boolean(process.env.NETLIFY || process.env.AWS_LAMBDA_FUNCTION_NAME);
const server = isServerless ? undefined : app.listen(port, '0.0.0.0', () => console.log(`Inquiry API listening on http://localhost:${port}`));

const shutdown = async () => {
  server?.close();
  await client?.close();
};
process.on('SIGINT', () => void shutdown());
process.on('SIGTERM', () => void shutdown());
