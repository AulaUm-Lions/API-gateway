// src/config/services.config.ts
import { ServicesConfig, RateLimitsConfig } from '../interfaces';

interface Config {
  services: ServicesConfig;
  rateLimits: RateLimitsConfig;
  publicRoutes: string[];
}

const config: Config = {
  services: {
    auth: {
      url: process.env.AUTH_SERVICE_URL || 'http://localhost:3001',
      timeout: 10000,
      retries: 3
    },
    users: {
      url: process.env.USERS_SERVICE_URL || 'http://localhost:3002',
      timeout: 10000,
      retries: 3
    },
    email: {
      url: process.env.EMAIL_SERVICE_URL || 'http://localhost:3003',
      timeout: 15000,
      retries: 2
    },
    payment: {
      url: process.env.PAYMENT_SERVICE_URL || 'http://localhost:3004',
      timeout: 30000,
      retries: 3
    }
  },

  // Configurações de rate limiting por serviço
  rateLimits: {
    default: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: 100
    },
    auth: {
      windowMs: 15 * 60 * 1000,
      max: 20 // Login mais restritivo
    },
    payment: {
      windowMs: 15 * 60 * 1000,
      max: 50
    }
  },

  // Rotas que não precisam de autenticação
  publicRoutes: [
    '/health',
    '/api/auth/login',
    '/api/auth/register',
    '/api/auth/refresh',
    '/api/payment/webhook'
  ]
};

export const { services, rateLimits, publicRoutes } = config;
export default config;