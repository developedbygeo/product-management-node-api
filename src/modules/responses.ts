import { Response } from 'express';

export const sendRejectionResponse = (
    res: Response,
    status: number,
    message: string
): void => {
    res.status(status).json({ message });
    return;
};
