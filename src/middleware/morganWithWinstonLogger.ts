import morgan from 'morgan';
import { logger } from '../utils/logger';

/**
 * Middleware that integrates Morgan with Winston logger.
 *
 * This middleware logs HTTP requests using Morgan's predefined format and
 * streams the log messages to Winston logger. It logs the HTTP method, URL,
 * status code, response content length, response time, and remote address.
 *
 * @constant
 * @type {morgan}
 *
 * @example
 * // Usage in an Express application
 * import express from 'express';
 * import { morganWithWinstonLogger } from './middleware/morganWithWinstonLogger';
 *
 * const app = express();
 * app.use(morganWithWinstonLogger);
 *
 * @see {@link https://github.com/expressjs/morgan|Morgan Documentation}
 * @see {@link https://github.com/winstonjs/winston|Winston Documentation}
 */
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
