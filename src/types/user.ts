import jwt from 'jsonwebtoken';
import { Request } from 'express';

export type RequestWithUser = Request & {
    user?: string | jwt.JwtPayload;
};
