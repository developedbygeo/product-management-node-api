import { Router } from 'express';
import {
    PROTECTED_ROUTES,
    PROTECTED_ROUTES_SEGMENTS,
} from '../constants/routes';
import {
    createProduct,
    deleteProduct,
    getProducts,
    getSpecificProduct,
    updateProduct,
} from '../handlers/product';
import {
    validatePostSpecificProduct,
    validatePutSpecificProduct,
} from '../middleware/validators';
import { Request, Response, NextFunction } from 'express';
import { handleError } from '../middleware/handleError';

const router = Router();

router.get(PROTECTED_ROUTES_SEGMENTS.ROOT, getProducts);
router.get(PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID, getSpecificProduct);
router.put(
    PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID,
    validatePutSpecificProduct,
    updateProduct
);
router.post(
    PROTECTED_ROUTES_SEGMENTS.ROOT,
    validatePostSpecificProduct,
    createProduct
);
router.delete(PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID, deleteProduct);

router.use(PROTECTED_ROUTES_SEGMENTS.ROOT, handleError);

export default router;
