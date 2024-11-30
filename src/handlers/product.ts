import { Request, Response } from 'express';
import prisma from '../db';
import { RequestWithUser } from '../types/user';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { logger } from '../utils/logger';
import { LOG_MESSAGES } from '../constants/logMessages';

export const getProducts = async (req: RequestWithUser, res: Response) => {
    logger.info(`User in request: ${req!.user!.id}`);
    const user = await prisma.user.findUnique({
        where: { id: req!.user!.id },
        include: {
            products: true,
        },
    });
    logger.info(
        `${LOG_MESSAGES.USER_LOCATED}: ${req!.user!.id}. ${LOG_MESSAGES.USER_PRODUCTS_LOCATED}: ${user!.products.length}. ${LOG_MESSAGES.USER_PRODUCTS_LIST}: ${user!.products}`
    );

    res.status(StatusCodes.OK).json({ data: user!.products });
};

export const getSpecificProduct = async (
    req: RequestWithUser,
    res: Response
) => {
    const { id: productId } = req.params;
    logger.info(`${LOG_MESSAGES.PRODUCT_ID_IN_REQUEST}: ${productId}`);

    const product = await prisma.product.findUnique({
        where: {
            id: productId,
            belongsToId: req!.user!.id,
        },
    });
    logger.info(`Found product: ${product}`);

    if (!product) {
        logger.error(LOG_MESSAGES.PRODUCT_NOT_FOUND);
        res.status(StatusCodes.NOT_FOUND).json({
            error: ReasonPhrases.NOT_FOUND,
        });
        return;
    }

    res.status(StatusCodes.OK).json({ data: product });
    return;
};

export const createProduct = async (req: RequestWithUser, res: Response) => {
    const { name } = req.body;
    logger.info(`Creating product with name: ${name}`);

    const product = await prisma.product.create({
        data: {
            name,
            belongsToId: req!.user!.id,
        },
    });
    logger.info(`Created product: ${product}`);

    res.status(StatusCodes.CREATED).json({ data: product });
    return;
};

export const updateProduct = async (req: RequestWithUser, res: Response) => {
    const { id: productId } = req.params;
    const { name } = req.body;
    logger.info(`Updating product with id: ${productId}`);

    const updated = await prisma.product.update({
        where: {
            id_belongsToId: {
                id: productId,
                belongsToId: req!.user!.id,
            },
        },
        data: {
            name,
        },
    });

    logger.info(`Updated product with id: ${updated.id}`);
    logger.info(`Updated product: ${updated}`);

    res.status(StatusCodes.OK).json({ data: updated });
    return;
};

export const deleteProduct = async (req: RequestWithUser, res: Response) => {
    const { id: productId } = req.params;
    logger.info(`Deleting product with id: ${productId}`);

    try {
        const deleted = await prisma.product.delete({
            where: {
                id_belongsToId: {
                    id: productId,
                    belongsToId: req!.user!.id,
                },
            },
        });

        logger.info(`Deleted product with id: ${deleted.id}`);
        logger.info(`Deleted product: ${deleted}`);

        res.status(StatusCodes.OK).json({ data: deleted });
    } catch (error) {
        logger.error(
            `Unable to delete item with id: ${productId}. Error: ${error}`
        );
        res.status(StatusCodes.NOT_FOUND).json({
            error: LOG_MESSAGES.PRODUCT_NOT_FOUND,
        });
        return;
    }
};
