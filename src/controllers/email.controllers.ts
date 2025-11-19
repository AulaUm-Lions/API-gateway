// src/controllers/email.controller.ts
import { Response, NextFunction } from 'express';
import ProxyService from '../services/proxy.service';
import { services } from '../config/services.config';
import { AuthRequest } from '../interfaces';

const emailProxy = new ProxyService(services.email);

class EmailController {
  async sendEmail(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await emailProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async sendBulkEmail(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await emailProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getEmailStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await emailProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getEmailHistory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await emailProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new EmailController();