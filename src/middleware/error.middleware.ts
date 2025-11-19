// src/middleware/error.middleware.ts
import { Request, Response, NextFunction } from 'express';
import ApiError from '../errors/api.error';
import appConfig from '../config/app.config';
import { ApiErrorResponse } from '../interfaces';

export const errorHandler = (
  err: Error | ApiError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = err;

  // Se não for um ApiError, converte para um
  if (!(error instanceof ApiError)) {
    const statusCode = (error as any).statusCode || 500;
    const message = error.message || 'Erro interno do servidor';
    error = new ApiError(statusCode, message, false, err.stack);
  }

  const response: ApiErrorResponse = {
    status: 'error',
    statusCode: (error as ApiError).statusCode,
    message: error.message,
    ...(appConfig.env === 'development' && { stack: error.stack })
  };

  // Log do erro
  console.error({
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.path,
    statusCode: (error as ApiError).statusCode,
    message: error.message,
    ...(appConfig.env === 'development' && { stack: error.stack })
  });

  res.status((error as ApiError).statusCode).json(response);
};

export const notFoundHandler = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  const error = ApiError.notFound(`Rota ${req.originalUrl} não encontrada`);
  next(error);
};