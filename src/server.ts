import express from 'express';
import morgan from 'morgan';
import router from './router';
import { ROUTES_ROOT } from './constants/routes';
import { morganWithWinstonLogger } from './middleware/morganWithWinstonLogger';

const app = express();

/* middleware */
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganWithWinstonLogger);

app.use(ROUTES_ROOT.API, router);

export default app;
