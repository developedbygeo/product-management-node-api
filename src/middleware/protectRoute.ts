import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { ExtractedUserFromJwt, RequestWithUser } from '../types/user';
import { logger } from '../utils/logger';
import { LOG_MESSAGES } from '../constants/logMessages';
import { sendRejectionResponse } from '../modules/responses';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

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
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED
        );
        sendRejectionResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED
        );
        logger.error(LOG_MESSAGES.NO_BEARER);
    }

    const token = bearer!.split('Bearer ')[1];
    // Verify the token
    if (!token) {
        logger.error(LOG_MESSAGES.NO_TOKEN);

        sendRejectionResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED
        );
    }

    // decode the token
    try {
        const user = jwt.verify(token, process.env.JWT_SECRET!) as
            | ExtractedUserFromJwt
            | undefined;

        if (!user) {
            sendRejectionResponse(
                res,
                StatusCodes.UNAUTHORIZED,
                ReasonPhrases.UNAUTHORIZED
            );
        }
        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        logger.error(`${LOG_MESSAGES.INVALID_TOKEN}: ${error}`);
        sendRejectionResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED
        );
    }
};
