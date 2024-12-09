import { Server } from 'socket.io';
import { createServer } from 'http';
import { authMiddleware } from '../middleware/auth.js';

export class WebSocketService {
  constructor(app) {
    this.httpServer = createServer(app);
    this.io = new Server(this.httpServer, {
      cors: {
        origin: process.env.CLIENT_URL || 'http://localhost:5173',
        methods: ['GET', 'POST']
      }
    });

    this.setupMiddleware();
    this.setupEventHandlers();
  }

  setupMiddleware() {
    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      // Verify token here
      next();
    });
  }

  setupEventHandlers() {
    this.io.on('connection', (socket) => {
      console.log('Client connected');

      socket.on('subscribe-stream', (streamId) => {
        socket.join(`stream:${streamId}`);
      });

      socket.on('unsubscribe-stream', (streamId) => {
        socket.leave(`stream:${streamId}`);
      });

      socket.on('disconnect', () => {
        console.log('Client disconnected');
      });
    });
  }

  broadcastStreamUpdate(streamId, data) {
    this.io.to(`stream:${streamId}`).emit('stream-update', data);
  }

  start(port) {
    this.httpServer.listen(port);
    return this.httpServer;
  }
}