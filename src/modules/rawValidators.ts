import { UPDATE_STATUS } from '@prisma/client';
import { body, oneOf } from 'express-validator';

export const validateRequiredBodyNameProperty = body('name')
    .isString()
    .withMessage('A name property is required inside the body')
    .isLength({ min: 1, max: 255 })
    .withMessage(
        'Name must be a string with a length between 1 and 255 characters'
    );

export const validateOptionalNameProperty = body('name')
    .optional()
    .isString()
    .withMessage('Name must be a string');

export const validateOptionalTitleProperty = body('title').optional();
export const validateOptionalBodyProperty = body('body').optional();
export const validateOptionalStatusProperty = oneOf(
    [
        body('status').optional().equals(UPDATE_STATUS.IN_PROGRESS.toString()),
        body('status').optional().equals(UPDATE_STATUS.SHIPPED.toString()),
        body('status').optional().equals(UPDATE_STATUS.DEPRECATED.toString()),
    ],
    {
        message:
            'Status must be one of the following values: IN_PROGRESS, SHIPPED, DEPRECATED',
    }
);
export const validateOptionalVersionProperty = body('version').optional();

export const validateRequiredNameProperty = body('name')
    .isString()
    .withMessage('A name property is required inside the body')
    .isLength({ min: 1, max: 255 })
    .withMessage(
        'Name must be a string with a length between 1 and 255 characters'
    );

export const validateRequiredTitleProperty = body('title')
    .isString()
    .withMessage('A title property is required inside the body')
    .isLength({ min: 1, max: 255 })
    .withMessage(
        'Title must be a string with a length between 1 and 255 characters'
    );

export const validateRequiredBodyProperty = body('body')
    .exists()
    .isString()
    .withMessage('A body property is required inside the body');

export const validateOptionalDescription = body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string');

export const validateRequiredDescription = body('description')
    .exists()
    .isString()
    .withMessage('A description property is required inside the body');

export const validateRequiredUpdateId = body('updateId')
    .exists()
    .isString()
    .withMessage('An updateId property is required inside the body');

export const validateRequiredProductId = body('productId')
    .exists()
    .isString()
    .withMessage('A productId property is required inside the body');

export const validateRequiredUpdatePointId = body('updatePointId')
    .exists()
    .isString()
    .withMessage('An updatePointId property is required inside the body');
