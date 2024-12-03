import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../utils/errors/CustomError';

export const handleError = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = err instanceof CustomError ? err.statusCode : 500;

    res.status(statusCode).json({
        data: null,
        error: {
            code: statusCode,
            message: err.message,
            details: {
                data: err.cause,
                name: err.name,
            },
        },
    });
};
