import { Router, Request, Response } from 'express';
import {
    createUpdate,
    deleteUpdate,
    getSpecificUpdate,
    getUpdates,
    updateUpdate,
} from '../handlers/update';
import {
    validatePostUpdate,
    validatePutSpecificUpdate,
} from '../middleware/validators';
import { PROTECTED_ROUTES_SEGMENTS } from '../constants/routes';

const router = Router();

router.get(PROTECTED_ROUTES_SEGMENTS.ROOT, getUpdates);
router.get(PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID, getSpecificUpdate);
router.put(
    PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID,
    validatePutSpecificUpdate,
    updateUpdate
);
router.post(PROTECTED_ROUTES_SEGMENTS.ROOT, validatePostUpdate, createUpdate);
router.delete(PROTECTED_ROUTES_SEGMENTS.SPECIFIC_ID, deleteUpdate);

export default router;
