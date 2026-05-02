import pino from 'pino';
import { env } from '../config/env.js';

export const logger = pino({
  level: env.LOG_LEVEL,
  redact: {
    paths: ['password', 'token', 'authorization', 'cookie', 'refreshToken'],
    remove: true
  }
});
