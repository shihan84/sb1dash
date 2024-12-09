export const config = {
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  dbPath: process.env.DB_PATH || './data/dashboard.db',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173'
};