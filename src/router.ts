import { Router } from 'express';
import { PROTECTED_ROUTES } from './constants/routes';
import productRouter from './routes/products';
import updateRouter from './routes/updates';
import updatePointRouter from './routes/updatePoint';

const router = Router();

router.use(PROTECTED_ROUTES.ALL_PRODUCTS, productRouter);
router.use(PROTECTED_ROUTES.ALL_UPDATES, updateRouter);
router.use(PROTECTED_ROUTES.ALL_UPDATE_POINTS, updatePointRouter);

export default router;
