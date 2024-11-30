import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import router from './router';
import { ROUTES_ROOT } from './constants/routes';
import { morganWithWinstonLogger } from './middleware/morganWithWinstonLogger';
import { protectRoute } from './middleware/protectRoute';
import { createUserHandler, logInHandler } from './handlers/user';

const app = express();

const env = process.env.NODE_ENV || 'development';

/* middleware */
app.use(cors());
app.use(morgan(env === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morganWithWinstonLogger);

app.use(ROUTES_ROOT.API, protectRoute, router);

/* non-protected routes to allow registering and signing-in users */
app.post(ROUTES_ROOT.REGISTER, createUserHandler);
app.post(ROUTES_ROOT.LOG_IN, logInHandler);

export default app;
