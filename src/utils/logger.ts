import { resolve } from 'path';
import winston from 'winston';

const logPath = resolve(__dirname, '../../logs/app.log');

const loggerLevels = {
    ...winston.config.syslog.levels,
    http: 6,
};

const loggerColors = {
    ...winston.config.syslog.colors,
    http: 'blue',
};

winston.addColors(loggerColors);

export const logger = winston.createLogger({
    levels: loggerLevels,

    format: winston.format.combine(
        winston.format.timestamp({ format: 'DD-MM-YYYY HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.printf((info) => {
                    return `${info.timestamp} [${info.level}]: ${info.message} ${
                        info.stack || ''
                    }`;
                })
            ),
        }),
        new winston.transports.File({ filename: logPath }),
    ],
});
