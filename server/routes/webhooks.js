import { Router } from 'express';
import { WebhooksController } from '../controllers/webhooks.js';

const router = Router();
const webhooksController = new WebhooksController();

router.post('/', webhooksController.handleWebhook.bind(webhooksController));

export default router;