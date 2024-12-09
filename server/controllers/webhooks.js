import { z } from 'zod';
import { logger } from '../utils/logger.js';
import db from '../config/database.js';

const webhookSchema = z.object({
  event: z.string(),
  stream: z.string(),
  timestamp: z.string(),
  data: z.record(z.unknown()),
});

export class WebhooksController {
  constructor(wsService) {
    this.wsService = wsService;
  }

  async handleWebhook(req, res) {
    try {
      const payload = webhookSchema.parse(req.body);
      logger.info('Received webhook:', payload);

      switch (payload.event) {
        case 'stream_started':
          await this.handleStreamStarted(payload);
          break;
        case 'stream_stopped':
          await this.handleStreamStopped(payload);
          break;
        case 'stream_error':
          await this.handleStreamError(payload);
          break;
      }

      res.json({ success: true });
    } catch (error) {
      logger.error('Webhook handling failed:', error);
      res.status(400).json({ error: error.message });
    }
  }

  async handleStreamStarted(payload) {
    await db.prepare(`
      UPDATE streams
      SET status = 'active'
      WHERE id = ?
    `).run(payload.stream);

    this.wsService.broadcastStreamUpdate(payload.stream, {
      status: 'active',
      ...payload.data,
    });
  }

  async handleStreamStopped(payload) {
    await db.prepare(`
      UPDATE streams
      SET status = 'inactive'
      WHERE id = ?
    `).run(payload.stream);

    this.wsService.broadcastStreamUpdate(payload.stream, {
      status: 'inactive',
      ...payload.data,
    });
  }

  async handleStreamError(payload) {
    logger.error('Stream error:', payload);
    this.wsService.broadcastStreamUpdate(payload.stream, {
      status: 'error',
      error: payload.data.error,
    });
  }
}