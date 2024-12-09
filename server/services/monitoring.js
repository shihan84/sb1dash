import { WebSocketService } from './websocket.js';
import { FlussonicService } from './flussonic.js';
import { logger } from '../utils/logger.js';
import db from '../config/database.js';

export class MonitoringService {
  constructor(config, wsService) {
    this.flussonicService = new FlussonicService(config);
    this.wsService = wsService;
    this.monitoringInterval = null;
  }

  async startMonitoring() {
    if (this.monitoringInterval) {
      return;
    }

    this.monitoringInterval = setInterval(async () => {
      try {
        await this.updateStreamStats();
        await this.updateBandwidthStats();
      } catch (error) {
        logger.error('Monitoring update failed:', error);
      }
    }, 5000); // Update every 5 seconds
  }

  async updateStreamStats() {
    const streams = await this.flussonicService.getStreams();
    
    for (const stream of streams) {
      const stats = await this.flussonicService.getStreamStats(stream.name);
      
      // Update database
      db.prepare(`
        INSERT OR REPLACE INTO streams (id, name, quality, bitrate, status)
        VALUES (?, ?, ?, ?, ?)
      `).run(
        stream.name,
        stream.name,
        stats.quality || 'unknown',
        stats.bitrate || 0,
        stats.alive ? 'active' : 'inactive'
      );

      // Broadcast updates via WebSocket
      this.wsService.broadcastStreamUpdate(stream.name, {
        ...stream,
        ...stats,
      });
    }
  }

  async updateBandwidthStats() {
    const now = new Date();
    const from = new Date(now - 3600000); // Last hour

    const stats = await this.flussonicService.getBandwidthStats(
      from.toISOString(),
      now.toISOString()
    );

    // Store in database
    db.prepare(`
      INSERT INTO traffic_data (timestamp, bandwidth, viewers)
      VALUES (?, ?, ?)
    `).run(
      now.toISOString(),
      stats.bandwidth || 0,
      stats.viewers || 0
    );
  }

  stopMonitoring() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
  }
}