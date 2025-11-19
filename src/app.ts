// src/app.ts
import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import 'dotenv/config';

import appConfig from './config/app.config';
import routes from './routes';
import { errorHandler, notFoundHandler } from './middleware/error.middleware';
import { defaultLimiter } from './middleware/rate.limit.middlewares';

const app: Application = express();

// Middlewares de segurança
app.use(helmet());
app.use(cors(appConfig.cors));

// Middlewares de parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logger
if (appConfig.env === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// Rate limiting global
app.use(defaultLimiter);

// Registrar rotas
app.use(routes);

// Tratamento de erro 404
app.use(notFoundHandler);

// Tratamento de erros global
app.use(errorHandler);

export default app;