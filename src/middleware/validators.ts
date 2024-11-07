import { validationResult } from 'express-validator';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import {
    validateOptionalBodyProperty,
    validateOptionalVersionProperty,
    validateOptionalDescription,
    validateOptionalNameProperty,
    validateOptionalStatusProperty,
    validateOptionalTitleProperty,
    validateRequiredBodyProperty,
    validateRequiredDescription,
    validateRequiredNameProperty,
    validateRequiredTitleProperty,
    validateRequiredUpdateId,
} from '../modules/rawValidators';

export const handleValidationErrors = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            errors: errors.array(),
        });
        return;
    }
    next();
};

export const validatePutSpecificProduct = [
    validateRequiredNameProperty,
    handleValidationErrors,
];
export const validatePostSpecificProduct = [
    validateRequiredNameProperty,
    handleValidationErrors,
];

export const validatePutSpecificUpdate = [
    validateOptionalTitleProperty,
    validateOptionalBodyProperty,
    validateOptionalStatusProperty,
    validateOptionalVersionProperty,
    handleValidationErrors,
];
export const validatePostUpdate = [
    validateRequiredTitleProperty,
    validateRequiredBodyProperty,
    handleValidationErrors,
];

export const validatePutUpdatePoint = [
    validateOptionalNameProperty,
    validateOptionalDescription,
    handleValidationErrors,
];

export const validatePostUpdatePoint = [
    validateRequiredNameProperty,
    validateRequiredDescription,
    validateRequiredUpdateId,
    handleValidationErrors,
];

export const validateRequiredName = [
    validateRequiredNameProperty,
    handleValidationErrors,
];
