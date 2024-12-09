export interface StreamData {
  id: string;
  name: string;
  viewers: number;
  quality: string;
  bitrate: number;
  status: 'active' | 'inactive';
}

export interface TrafficData {
  timestamp: string;
  bandwidth: number;
  viewers: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'operator' | 'viewer';
  lastActive: string;
}