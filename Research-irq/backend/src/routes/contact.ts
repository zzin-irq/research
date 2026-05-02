import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { z } from 'zod';

export const contactRouter = Router();

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1h
  limit: 10,
  standardHeaders: 'draft-7',
  legacyHeaders: false
});

const ContactInput = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  subject: z.string().min(1).max(200),
  body: z.string().min(20).max(5000),
  recaptchaToken: z.string().optional()
}).strict();

contactRouter.post('/', contactLimiter, async (req, res, next) => {
  try {
    const data = ContactInput.parse(req.body);
    // TODO: persist + email + audit. For now just accept.
    res.status(202).json({ received: true, name: data.name });
  } catch (err) {
    next(err);
  }
});
