import { Router } from 'express';
import { db } from '../db/index.js';

export const healthRouter = Router();

healthRouter.get('/', async (_req, res) => {
  try {
    await db.selectFrom('schema_migrations').select('version').limit(1).execute();
    res.json({ status: 'ok', db: 'ok' });
  } catch {
    res.status(503).json({ status: 'degraded', db: 'down' });
  }
});
