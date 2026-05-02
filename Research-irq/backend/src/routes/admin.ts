import { Router } from 'express';
import { requireAuth, requireRole } from '../middleware/auth.js';

export const adminRouter = Router();

// Every admin route requires a logged-in admin or super.
adminRouter.use(requireAuth, requireRole('admin'));

adminRouter.get('/articles', (_req, res) => res.json({ items: [] }));
adminRouter.post('/articles', (_req, res) => res.status(501).end());
adminRouter.patch('/articles/:id', (_req, res) => res.status(501).end());
adminRouter.post('/articles/:id/publish', (_req, res) => res.status(501).end());

// Super-only sub-routes
adminRouter.get('/users', requireRole('super'), (_req, res) => res.json({ items: [] }));
adminRouter.post('/users', requireRole('super'), (_req, res) => res.status(501).end());
adminRouter.patch('/users/:id/role', requireRole('super'), (_req, res) => res.status(501).end());
adminRouter.get('/audit', requireRole('super'), (_req, res) => res.json({ items: [] }));
