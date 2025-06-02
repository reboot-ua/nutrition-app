export const authConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'your-secret-key',
    accessTokenExpiresIn: '15m',
    refreshTokenExpiresIn: '7d'
  }
} 