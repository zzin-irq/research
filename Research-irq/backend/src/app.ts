import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import compression from 'compression';
import pinoHttp from 'pino-http';
import { env } from './config/env.js';
import { logger } from './lib/logger.js';
import { errorHandler } from './middleware/error.js';
import { requestId } from './middleware/requestId.js';
import { healthRouter } from './routes/health.js';

export function buildApp() {
  const app = express();

  app.set('trust proxy', env.TRUST_PROXY);
  app.disable('x-powered-by');

  app.use(helmet({
    contentSecurityPolicy: env.NODE_ENV === 'production' ? undefined : false,
    crossOriginEmbedderPolicy: false
  }));
  app.use(cors({
    origin: env.FRONTEND_ORIGIN.split(',').map(s => s.trim()),
    credentials: true
  }));
  app.use(compression());
  app.use(express.json({ limit: '256kb' }));
  app.use(requestId);
  app.use(pinoHttp({ logger }));

  app.use('/api/v1/health', healthRouter);

  app.use((_req, res) => res.status(404).json({ error: { code: 'not_found', message: 'Not found' } }));
  app.use(errorHandler);

  return app;
}
