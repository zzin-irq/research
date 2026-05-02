import { Router } from 'express';
import rateLimit from 'express-rate-limit';

export const authRouter = Router();

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

authRouter.post('/login', loginLimiter, async (_req, res) => {
  // TODO: validate body, check password, issue tokens, set refresh cookie.
  res.status(501).json({ error: { code: 'not_implemented', message: 'Auth login pending' } });
});
authRouter.post('/refresh', async (_req, res) => {
  res.status(501).json({ error: { code: 'not_implemented', message: 'Refresh pending' } });
});
authRouter.post('/logout', async (_req, res) => {
  res.status(501).json({ error: { code: 'not_implemented', message: 'Logout pending' } });
});
