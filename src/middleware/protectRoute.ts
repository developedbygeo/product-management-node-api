import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/user';
import { logger } from '../utils/logger';
import { LOG_MESSAGES } from '../constants/logMessages';
import { sendRejectionResponse } from '../modules/responses';
import { API_RESPONSE_MESSAGES } from '../constants/messages';

/**
 * Middleware to protect routes by verifying the JWT token in the request headers.
 *
 * @param req - The request object, extended with a user property.
 * @param res - The response object.
 * @param next - The next middleware function in the stack.
 *
 * @returns Calls the next middleware function if the token is valid, otherwise sends an unauthorized response.
 *
 * @throws Will send an unauthorized response if the authorization header is missing or does not start with 'Bearer '.
 * @throws Will send an unauthorized response if the token is missing or invalid.
 */
export const protectRoute = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        sendRejectionResponse(
            res,
            401,
            API_RESPONSE_MESSAGES.USER_UNAUTHORIZED
        );
        sendRejectionResponse(
            res,
            401,
            API_RESPONSE_MESSAGES.USER_UNAUTHORIZED
        );
        logger.error(LOG_MESSAGES.NO_BEARER);
    }

    const token = bearer!.split('Bearer ')[1];
    // Verify the token
    if (!token) {
        sendRejectionResponse(
            res,
            401,
            API_RESPONSE_MESSAGES.USER_UNAUTHORIZED
        );
        logger.error(LOG_MESSAGES.NO_TOKEN);
    }

    // decode the token
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!);
        req.user = user;
        next();
    } catch (error) {
        logger.error(`${LOG_MESSAGES.INVALID_TOKEN}: ${error}`);
        sendRejectionResponse(
            res,
            401,
            API_RESPONSE_MESSAGES.USER_INVALID_TOKEN
        );
    }
};
