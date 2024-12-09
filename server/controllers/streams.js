import db from '../config/database.js';
import { z } from 'zod';

const streamSchema = z.object({
  name: z.string().min(1),
  quality: z.string(),
  bitrate: z.number().min(0),
  status: z.enum(['active', 'inactive'])
});

export class StreamsController {
  getStreams(req, res) {
    const streams = db.prepare('SELECT * FROM streams').all();
    res.json(streams);
  }

  getStream(req, res) {
    const stream = db.prepare('SELECT * FROM streams WHERE id = ?').get(req.params.id);
    if (!stream) {
      return res.status(404).json({ error: 'Stream not found' });
    }
    res.json(stream);
  }

  createStream(req, res) {
    try {
      const data = streamSchema.parse(req.body);
      const result = db.prepare(
        'INSERT INTO streams (id, name, quality, bitrate, status) VALUES (?, ?, ?, ?, ?)'
      ).run(crypto.randomUUID(), data.name, data.quality, data.bitrate, data.status);
      
      res.status(201).json({ id: result.lastInsertRowid });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  updateStream(req, res) {
    try {
      const data = streamSchema.parse(req.body);
      const result = db.prepare(
        'UPDATE streams SET name = ?, quality = ?, bitrate = ?, status = ? WHERE id = ?'
      ).run(data.name, data.quality, data.bitrate, data.status, req.params.id);

      if (result.changes === 0) {
        return res.status(404).json({ error: 'Stream not found' });
      }
      res.json({ success: true });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  deleteStream(req, res) {
    const result = db.prepare('DELETE FROM streams WHERE id = ?').run(req.params.id);
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Stream not found' });
    }
    res.json({ success: true });
  }
}