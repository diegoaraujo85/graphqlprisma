import { Request } from 'express';
import { verify } from 'jsonwebtoken';

import { APP_SECRET } from './config/auth';

interface Context {
  request: Request;
}

interface Payload {
  userId: number;
  iat: number;
}

export default function getUserId(context) {
  const Authorization = context.request.get('Authorization');

  if (Authorization) {
    const token = Authorization.replace('Bearer ', '');
    const { userId } = verify(token, APP_SECRET) as Payload;
    return userId;
  }

  throw new Error('Not authenticated');
}