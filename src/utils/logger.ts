import { resolve } from 'path';
import winston from 'winston';

const logPath = resolve(__dirname, '../../logs/app.log');

export const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: logPath }),
    ],
});
