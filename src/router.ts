import { Router } from 'express';
import { PROTECTED_ROUTES } from './constants/routes';

const router = Router();

/* Products */
router.get(PROTECTED_ROUTES.ALL_PRODUCTS, (req, res) => {
    res.json({ message: 'Hello' });
});
router.get(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

router.put(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

router.post(PROTECTED_ROUTES.ALL_PRODUCTS, () => {});

router.delete(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

/* Updates */
router.get(PROTECTED_ROUTES.ALL_UPDATES, () => {});
router.get(PROTECTED_ROUTES.SPECIFIC_UPDATE, () => {});

router.put(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

router.post(PROTECTED_ROUTES.ALL_PRODUCTS, () => {});

router.delete(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

/* Update Points */
router.get(PROTECTED_ROUTES.ALL_UPDATE_POINTS, () => {});
router.get(PROTECTED_ROUTES.SPECIFIC_UPDATE_POINT, () => {});

router.put(PROTECTED_ROUTES.SPECIFIC_UPDATE_POINT, () => {});

router.post(PROTECTED_ROUTES.ALL_UPDATE_POINTS, () => {});
router.delete(PROTECTED_ROUTES.SPECIFIC_UPDATE_POINT, () => {});

export default router;
