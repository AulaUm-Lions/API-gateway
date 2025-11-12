// src/controllers/users.controller.ts
import { Response, NextFunction } from 'express';
import ProxyService from '../services/proxy.service';
import { services } from '../config/services.config';
import { AuthRequest } from '../interfaces';

const usersProxy = new ProxyService(services.users);

class UsersController {
  async getProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await usersProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async updateProfile(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await usersProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await usersProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async listUsers(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await usersProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await usersProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new UsersController();