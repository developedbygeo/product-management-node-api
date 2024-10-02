import morgan from 'morgan';
import { logger } from '../utils/logger';

export const morganWithWinstonLogger = morgan(
    ':method :url :status :res[content-length] - :response-time ms - :remote-addr',
    {
        stream: {
            write: (message) => {
                logger.http(message.trim());
                console.log(message);
            },
        },
    }
);
