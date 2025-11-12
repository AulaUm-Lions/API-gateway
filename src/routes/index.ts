// src/routes/index.ts
import { Router, Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from '../docs/swagger.config';

import authRoutes from './auth.routes';
import usersRoutes from './users.routes';
import emailRoutes from './email.routes';
import paymentRoutes from './payment.routes';

const router = Router();

/**
 * @swagger
 * /health:
 *   get:
 *     tags: [Health]
 *     summary: Verifica o status do API Gateway
 *     description: Retorna informações sobre o status e tempo de atividade do serviço
 *     responses:
 *       200:
 *         description: Serviço operacional
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HealthCheck'
 */
router.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'API Gateway'
  });
});

// Documentação Swagger
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API Gateway - Documentação'
}));

// Registrar rotas dos microserviços
router.use('/api/auth', authRoutes);
router.use('/api/users', usersRoutes);
router.use('/api/email', emailRoutes);
router.use('/api/payment', paymentRoutes);

export default router;