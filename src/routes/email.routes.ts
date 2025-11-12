import { Router } from "express";
import emailController from "../controllers/email.controllers";
import { authenticateToken } from "../middleware/auth.middleware";

const router = Router();

// Todas as rotas de email precisam de autenticação
router.use(authenticateToken);

/**
 * @swagger
 * /api/email/send:
 *   post:
 *     tags: [Email]
 *     summary: Enviar email
 *     description: Envia um email para um ou mais destinatários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SendEmailRequest'
 *     responses:
 *       200:
 *         description: Email enviado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: email_123456
 *                 status:
 *                   type: string
 *                   example: sent
 *                 message:
 *                   type: string
 *                   example: Email enviado com sucesso
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       503:
 *         $ref: '#/components/responses/ServiceUnavailable'
 */
router.post("/send", emailController.sendEmail);

/**
 * @swagger
 * /api/email/send-bulk:
 *   post:
 *     tags: [Email]
 *     summary: Enviar emails em massa
 *     description: Envia o mesmo email para múltiplos destinatários
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [recipients, subject, body]
 *             properties:
 *               recipients:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: email
 *                 example: [usuario1@exemplo.com, usuario2@exemplo.com]
 *               subject:
 *                 type: string
 *                 example: Newsletter Mensal
 *               body:
 *                 type: string
 *                 example: <h1>Bem-vindo!</h1><p>Conteúdo da newsletter...</p>
 *     responses:
 *       200:
 *         description: Emails enviados com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 sent:
 *                   type: integer
 *                   example: 100
 *                 failed:
 *                   type: integer
 *                   example: 2
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.post("/send-bulk", emailController.sendBulkEmail);

/**
 * @swagger
 * /api/email/status/{id}:
 *   get:
 *     tags: [Email]
 *     summary: Consultar status do email
 *     description: Retorna o status de um email enviado
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do email
 *     responses:
 *       200:
 *         description: Status do email
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: email_123456
 *                 status:
 *                   type: string
 *                   enum: [pending, sent, delivered, failed, bounced]
 *                   example: delivered
 *                 sentAt:
 *                   type: string
 *                   format: date-time
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 */
router.get("/status/:id", emailController.getEmailStatus);

/**
 * @swagger
 * /api/email/history:
 *   get:
 *     tags: [Email]
 *     summary: Histórico de emails
 *     description: Lista os emails enviados pelo usuário
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
 *     responses:
 *       200:
 *         description: Lista de emails enviados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 emails:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       to:
 *                         type: string
 *                       subject:
 *                         type: string
 *                       status:
 *                         type: string
 *                       sentAt:
 *                         type: string
 *                         format: date-time
 *       401:
 *         $ref: '#/components/responses/Unauthorized'
 */
router.get("/history", emailController.getEmailHistory);

export default router;
