import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET!;

export interface JwtPayload {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

export function generateToken(payload: JwtPayload, expiresIn = '1d'): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}
