import { Router, Request, Response } from 'express';
import { PROTECTED_ROUTES } from './constants/routes';
import { body, oneOf, validationResult } from 'express-validator';
import {
    handleValidationErrors,
    validateRequiredName,
    validatePutSpecificProduct,
    validatePostUpdate,
    validatePutUpdatePoint,
    validatePostUpdatePoint,
    validatePostSpecificProduct,
    validatePutSpecificUpdate,
} from './middleware/validators';
import { getProducts, getSpecificProduct } from './handlers/product';

const router = Router();

/* ----------------- Products ----------------- */

router.get(PROTECTED_ROUTES.ALL_PRODUCTS, getProducts);
router.get(PROTECTED_ROUTES.SPECIFIC_PRODUCT, getSpecificProduct);
router.put(
    PROTECTED_ROUTES.SPECIFIC_PRODUCT,
    validatePutSpecificProduct,
    (req: Request, res: Response) => {
        res.json({ message: 'Hello' });
    }
);
router.post(
    PROTECTED_ROUTES.ALL_PRODUCTS,
    validatePostSpecificProduct,
    (req: Request, res: Response) => {}
);
router.delete(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

/* ----------------- Updates ----------------- */
router.get(PROTECTED_ROUTES.ALL_UPDATES, (req: Request, res: Response) => {});
router.get(PROTECTED_ROUTES.SPECIFIC_UPDATE, () => {});
router.put(
    PROTECTED_ROUTES.SPECIFIC_UPDATE,
    validatePutSpecificUpdate,
    (req: Request, res: Response) => {
        res.json({ message: 'Hello' });
    }
);
router.post(
    PROTECTED_ROUTES.ALL_UPDATES,
    validatePostUpdate,
    (req: Request, res: Response) => {
        res.json({ message: 'Hello' });
    }
);
router.delete(PROTECTED_ROUTES.SPECIFIC_PRODUCT, () => {});

/* ----------------- Update Points ----------------- */
router.get(PROTECTED_ROUTES.ALL_UPDATE_POINTS, () => {});
router.get(PROTECTED_ROUTES.SPECIFIC_UPDATE_POINT, () => {});
router.put(
    PROTECTED_ROUTES.SPECIFIC_UPDATE_POINT,
    validatePutUpdatePoint,
    (req: Request, res: Response) => {}
);
router.post(
    PROTECTED_ROUTES.ALL_UPDATE_POINTS,
    validatePostUpdatePoint,
    (req: Request, res: Response) => {}
);
router.delete(PROTECTED_ROUTES.SPECIFIC_UPDATE_POINT, () => {});

export default router;
