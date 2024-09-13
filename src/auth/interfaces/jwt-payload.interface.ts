import { Types } from 'mongoose';

export interface JwtPayload {
  userId: string;       // Change this to string
  username: string;
  role: string;
}
