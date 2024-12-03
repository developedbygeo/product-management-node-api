import morgan from 'morgan';
import { logger } from '../utils/logger';
import { Request } from 'express';
import { filterSensitiveData } from '../utils/data';

/**
 * Custom Morgan token to log the filtered request body.
 */
morgan.token('req-body', (req: Request) => {
    const filteredBody = filterSensitiveData(req.body);
    return JSON.stringify(filteredBody);
});

export const morganWithWinstonLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms - :remote-addr - req-body: :req-body',
    {
        stream: {
            write: (message: string) => {
                logger.http(message.trim());
            },
        },
    }
);
