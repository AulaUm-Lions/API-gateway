import { Router } from "express";
import paymentController from "../controllers/payment.controllers";
import { authenticateToken } from "../middleware/auth.middleware";
import { paymentLimiter } from "../middleware/rate.limit.middlewares";

const router = Router();

/**
 * @swagger
 * /api/payment/webhook:
 *   post:
 *     tags: [Payment]
 *     summary: Webhook de pagamento
 *     description: Endpoint para receber notificações de status de pagamento (não requer autenticação)
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               event:
 *                 type: string
 *                 example: payment.completed
 *               data:
 *                 type: object
 *     responses:
 *       200:
 *         description: Webhook processado com sucesso
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 */
router.post("/webhook", paymentController.processWebhook);

// Rotas protegidas
router.use(authenticateToken);
router.use(paymentLimiter);

/**
 * @swagger
 * /api/payment/checkout:
 *   post:
 *     tags: [Payment]
 *     summary: Criar checkout de pagamento
 *     description: Inicia um novo processo de pagamento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CheckoutRequest'
 *     responses:
 *       200:
 *         description: Checkout criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 checkoutUrl:
 *                   type: string
 *                   example: https://checkout.exemplo.com/pay/abc123
 *                 paymentId:
 *                   type: string
 *                   example: pay_123456
 *                 expiresAt:
 *                   type: string
 *                   format: date-time
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       429:
 *         $ref: '#/components/responses/TooManyRequests'
 */
router.post("/checkout", paymentController.createCheckout);

/**
 * @swagger
 * /api/payment/status/{id}:
 *   get:
 *     tags: [Payment]
 *     summary: Consultar status do pagamento
 *     description: Retorna o status atual de um pagamento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento
 *     responses:
 *       200:
 *         description: Status do pagamento
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Payment'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/status/:id", paymentController.getPaymentStatus);

/**
 * @swagger
 * /api/payment/history:
 *   get:
 *     tags: [Payment]
 *     summary: Histórico de pagamentos
 *     description: Lista todos os pagamentos do usuário
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 20
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, processing, completed, failed, refunded]
 *         description: Filtrar por status
 *     responses:
 *       200:
 *         description: Lista de pagamentos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 payments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Payment'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     page:
 *                       type: integer
 *                     limit:
 *                       type: integer
 *                     total:
 *                       type: integer
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/history", paymentController.getPaymentHistory);

/**
 * @swagger
 * /api/payment/refund/{id}:
 *   post:
 *     tags: [Payment]
 *     summary: Reembolsar pagamento
 *     description: Processa o reembolso de um pagamento
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 description: Valor a reembolsar (se parcial)
 *               reason:
 *                 type: string
 *                 example: Solicitação do cliente
 *     responses:
 *       200:
 *         description: Reembolso processado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 refundId:
 *                   type: string
 *                 status:
 *                   type: string
 *                   example: refunded
 *                 amount:
 *                   type: number
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.post("/refund/:id", paymentController.refundPayment);

/**
 * @swagger
 * /api/payment/cancel/{id}:
 *   delete:
 *     tags: [Payment]
 *     summary: Cancelar pagamento
 *     description: Cancela um pagamento pendente
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pagamento
 *     responses:
 *       200:
 *         description: Pagamento cancelado com sucesso
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.delete("/cancel/:id", paymentController.cancelPayment);

export default router;
