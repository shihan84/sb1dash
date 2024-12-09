import fetch from 'node-fetch';
import { logger } from '../utils/logger.js';

export class FlussonicService {
  constructor(config) {
    this.baseUrl = config.flussonicUrl;
    this.username = config.flussonicUsername;
    this.password = config.flussonicPassword;
    this.auth = Buffer.from(`${this.username}:${this.password}`).toString('base64');
  }

  async request(endpoint, options = {}) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...options,
        headers: {
          'Authorization': `Basic ${this.auth}`,
          'Content-Type': 'application/json',
          ...options.headers,
        },
      });

      if (!response.ok) {
        throw new Error(`Flussonic API error: ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      logger.error('Flussonic API request failed:', error);
      throw error;
    }
  }

  async getStreams() {
    return this.request('/flussonic/api/streams');
  }

  async getStreamStats(streamName) {
    return this.request(`/flussonic/api/stream/${streamName}/stats`);
  }

  async getStreamInfo(streamName) {
    return this.request(`/flussonic/api/stream/${streamName}/info`);
  }

  async getBandwidthStats(from, to) {
    return this.request('/flussonic/api/bandwidth_stats', {
      method: 'POST',
      body: JSON.stringify({ from, to }),
    });
  }
}