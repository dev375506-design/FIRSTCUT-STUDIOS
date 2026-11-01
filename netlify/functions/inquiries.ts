import type { Handler, HandlerResponse } from '@netlify/functions';
import serverless from 'serverless-http';
import { app } from '../../server/index.js';

const handler_fn = serverless(app, {
  binary: ['image/*', 'application/pdf', 'video/*', 'application/zip'],
});

export const handler: Handler = async (event, context) => {
  // Rewrite the path so Express sees /api/...
  const raw = event.path || '';
  const path = raw.includes('/api/') ? raw.substring(raw.indexOf('/api/')) : raw;
  return (await handler_fn({ ...event, path }, context)) as unknown as HandlerResponse;
};
