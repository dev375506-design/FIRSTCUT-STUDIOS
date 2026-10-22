import type { Handler, HandlerResponse } from '@netlify/functions';
import serverless from 'serverless-http';
import { app } from '../../server/index.js';

const expressHandler = serverless(app, {
  binary: ['image/*', 'application/pdf', 'video/*', 'application/zip'],
});

export const handler: Handler = async (event, context) => {
  const path = event.path.endsWith('/health') ? '/api/health' : '/api/inquiries';
  return await expressHandler({ ...event, path }, context) as unknown as HandlerResponse;
};
