// src/middleware/auth.middleware.ts
import { Response, NextFunction } from 'express';
import axios, { AxiosError } from 'axios';
import ApiError from '../errors/api.error';
import { services } from '../config/services.config';
import { AuthRequest } from '../interfaces';

export const authenticateToken = async (
  req: AuthRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw ApiError.unauthorized('Token não fornecido');
    }

    // Validar token com o serviço de autenticação
    const response = await axios.post(
      `${services.auth.url}/validate`,
      { token },
      {
        timeout: services.auth.timeout,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    // Anexar informações do usuário à requisição
    req.user = response.data.user;
    req.token = token;
    
    next();
  } catch (error) {
    const axiosError = error as AxiosError;
    
    if (axiosError.response) {
      if (axiosError.response.status === 401 || axiosError.response.status === 403) {
        return next(ApiError.unauthorized('Token inválido ou expirado'));
      }
    }
    
    if (axiosError.code === 'ECONNREFUSED') {
      return next(ApiError.serviceUnavailable('Serviço de autenticação indisponível'));
    }

    next(ApiError.unauthorized('Falha na autenticação'));
  }
};