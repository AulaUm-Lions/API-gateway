// src/controllers/auth.controller.ts
import { Response, NextFunction } from 'express';
import ProxyService from '../services/proxy.service';
import { services } from '../config/services.config';
import { AuthRequest } from '../interfaces';

const authProxy = new ProxyService(services.auth);

class AuthController {
  async login(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async register(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async refresh(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async logout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async validateToken(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await authProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();