import { API_RESPONSE_MESSAGES } from '../constants/messages';
import { Response } from 'express';

export const sendUnauthorizedResponse = (res: Response): void => {
    res.status(401).json({ message: API_RESPONSE_MESSAGES.UNAUTHORIZED });
    return;
};

export const sendInvalidTokenResponse = (res: Response): void => {
    res.status(401).json({ message: API_RESPONSE_MESSAGES.INVALID_TOKEN });
    return;
};
