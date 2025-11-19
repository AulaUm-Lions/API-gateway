// src/middleware/rateLimit.middleware.ts
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { rateLimits } from '../config/services.config';
import { RateLimitConfig } from '../interfaces';

const createRateLimiter = (config: RateLimitConfig = rateLimits.default): RateLimitRequestHandler => {
  return rateLimit({
    windowMs: config.windowMs,
    max: config.max,
    message: {
      status: 'error',
      statusCode: 429,
      message: 'Muitas requisições. Tente novamente mais tarde.'
    },
    standardHeaders: true,
    legacyHeaders: false,
  });
};

// Rate limiters específicos
export const defaultLimiter = createRateLimiter(rateLimits.default);
export const authLimiter = createRateLimiter(rateLimits.auth);
export const paymentLimiter = createRateLimiter(rateLimits.payment);

export { createRateLimiter };