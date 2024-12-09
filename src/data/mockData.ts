import { StreamData, TrafficData, User } from '../types/dashboard';
import { subHours, subDays, format } from 'date-fns';

export const mockStreams: StreamData[] = [
  {
    id: '1',
    name: 'Main Event Stream',
    viewers: 1250,
    quality: '1080p',
    bitrate: 5000,
    status: 'active',
  },
  {
    id: '2',
    name: 'Secondary Stream',
    viewers: 450,
    quality: '720p',
    bitrate: 2500,
    status: 'active',
  },
  {
    id: '3',
    name: 'Backup Stream',
    viewers: 0,
    quality: '1080p',
    bitrate: 0,
    status: 'inactive',
  },
];

export const mockTrafficData: TrafficData[] = Array.from({ length: 24 }, (_, i) => ({
  timestamp: format(subHours(new Date(), 23 - i), 'HH:mm'),
  bandwidth: Math.floor(Math.random() * 1000) + 500,
  viewers: Math.floor(Math.random() * 2000) + 200,
}));

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    lastActive: format(subHours(new Date(), 2), 'yyyy-MM-dd HH:mm'),
  },
  {
    id: '2',
    name: 'Stream Operator',
    email: 'operator@example.com',
    role: 'operator',
    lastActive: format(subDays(new Date(), 1), 'yyyy-MM-dd HH:mm'),
  },
];