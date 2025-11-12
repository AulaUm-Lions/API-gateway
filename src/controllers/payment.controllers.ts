// src/controllers/payment.controller.ts
import { Response, NextFunction } from 'express';
import ProxyService from '../services/proxy.service';
import { services } from '../config/services.config';
import { AuthRequest } from '../interfaces';

const paymentProxy = new ProxyService(services.payment);

class PaymentController {
  async createCheckout(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getPaymentStatus(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async getPaymentHistory(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async processWebhook(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async refundPayment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }

  async cancelPayment(req: AuthRequest, res: Response, next: NextFunction): Promise<void> {
    try {
      const result = await paymentProxy.forwardRequest(req);
      res.status(result.status).json(result.data);
    } catch (error) {
      next(error);
    }
  }
}

export default new PaymentController();