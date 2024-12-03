import { Router } from 'express';
import {
    createUpdatePoint,
    deleteUpdatePoint,
    getSpecificUpdatePoint,
    getUpdatePoints,
    updateUpdatePoint,
} from '../handlers/updatePoint';
import {
    validatePostUpdatePoint,
    validatePutSpecificUpdate,
} from '../middleware/validators';
import { PROTECTED_ROUTES_SEGMENTS } from '../constants/routes';
import { handleError } from '../middleware/handleError';

const router = Router();

router.get(PROTECTED_ROUTES_SEGMENTS.ROOT, getUpdatePoints);
router.get(PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID, getSpecificUpdatePoint);
router.put(
    PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID,
    validatePutSpecificUpdate,
    updateUpdatePoint
);
router.post(
    PROTECTED_ROUTES_SEGMENTS.ROOT,
    validatePostUpdatePoint,
    createUpdatePoint
);
router.delete(PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID, deleteUpdatePoint);

router.use(PROTECTED_ROUTES_SEGMENTS.ROOT, handleError);

export default router;
