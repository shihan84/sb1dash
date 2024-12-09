import express from 'express';
import cors from 'cors';
import { config } from './config/config.js';
import streamsRouter from './routes/streams.js';
import webhooksRouter from './routes/webhooks.js';
import { WebSocketService } from './services/websocket.js';
import { MonitoringService } from './services/monitoring.js';
import { logger } from './utils/logger.js';

const app = express();
const wsService = new WebSocketService(app);
const monitoringService = new MonitoringService(config, wsService);

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/streams', streamsRouter);
app.use('/api/webhooks', webhooksRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  logger.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something broke!' });
});

const port = process.env.PORT || 3000;
wsService.start(port);
monitoringService.startMonitoring();

logger.info(`Server running on port ${port}`);