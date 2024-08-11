/* eslint-disable prettier/prettier */
import { Request } from 'express';

export interface RequestWithUser extends Request {
  user?: {
    id: string;
  };
}