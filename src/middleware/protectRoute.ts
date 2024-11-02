import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import {
    sendInvalidTokenResponse,
    sendUnauthorizedResponse,
} from '../modules/handleAuthResponses';
import { RequestWithUser } from '../types/user';

export const protectRoute = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        sendUnauthorizedResponse(res);
    }

    const token = bearer!.split('Bearer ')[1];
    // Verify the token
    if (!token) {
        sendUnauthorizedResponse(res);
    }

    // decode the token
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: 'Invalid token' });
        sendInvalidTokenResponse(res);
        return;
    }
};
