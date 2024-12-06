import config from './config';

import app from './server';
import { logger } from './utils/logger';

app.listen(config.port, () => {
    logger.info(`Application started on: http://localhost:${config.port}`);
    console.log(`Server is running on http://localhost:${config.port}`);
});
