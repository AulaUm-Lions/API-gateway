// src/config/app.config.ts
import { AppConfig } from '../interfaces';

const appConfig: AppConfig = {
  port: parseInt(process.env.PORT || '3000', 10),
  env: process.env.NODE_ENV || 'development',
  
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true
  },

  // Configurações de logs
  logging: {
    level: process.env.LOG_LEVEL || 'info',
    format: process.env.LOG_FORMAT || 'combined'
  },

  // Circuit Breaker config
  circuitBreaker: {
    timeout: 30000,
    errorThresholdPercentage: 50,
    resetTimeout: 30000
  }
};

export default appConfig;