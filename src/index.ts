import * as dotenv from 'dotenv';

dotenv.config();

import app from './server';
import { findAvailablePort } from './utils/port';
import { logger } from './utils/logger';

app.listen(3000, () => {
    logger.info(`Application started on: http://localhost:3000`);
    console.log('Server is running on http://localhost:3000');
});
