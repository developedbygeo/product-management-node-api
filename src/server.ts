import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { ROUTES_ROOT } from './constants/routes';
import { morganWithWinstonLogger } from './middleware/morganWithWinstonLogger';
import { protectRoute } from './middleware/protectRoute';

const app = express();

/* middleware */
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganWithWinstonLogger);

app.use(ROUTES_ROOT.API, protectRoute, router);

export default app;
