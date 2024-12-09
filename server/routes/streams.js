import { Router } from 'express';
import { authMiddleware } from '../middleware/auth.js';
import { StreamsController } from '../controllers/streams.js';

const router = Router();
const streamsController = new StreamsController();

router.get('/', authMiddleware, streamsController.getStreams);
router.get('/:id', authMiddleware, streamsController.getStream);
router.post('/', authMiddleware, streamsController.createStream);
router.put('/:id', authMiddleware, streamsController.updateStream);
router.delete('/:id', authMiddleware, streamsController.deleteStream);

export default router;