import dotenv from 'dotenv';

dotenv.config();
import merge from 'lodash.merge';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const stage = process.env.STAGE || 'local';

let envConfig;

if (stage === 'production') {
    envConfig = require('./prod').default;
} else if (stage === 'staging') {
    envConfig = require('./staging').default;
} else {
    envConfig = require('./local').default;
}

export default merge(
    {
        stage,
        environment: process.env.NODE_ENV,
        port: 3000,
        secrets: {
            jwt: process.env.JWT_SECRET,
            jwtExp: '1d',
            dbUrl: process.env.DATABASE_URL,
        },
    },
    envConfig
);
