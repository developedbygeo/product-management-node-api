import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { Response } from 'express';
import prisma from '../db';
import { RequestWithUser } from '../types/user';
import { logger } from '../utils/logger';
import { ProductUpdate } from '@prisma/client';

export const getUpdates = async (req: RequestWithUser, res: Response) => {
    logger.info(`User in request: ${req!.user!.id}`);
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req!.user!.id,
        },
        include: {
            updates: true,
        },
    });

    const allUpdatesForAllUserProducts = products.reduce((updates, product) => {
        return [...updates, ...product.updates];
    }, [] as ProductUpdate[]);

    res.status(StatusCodes.OK).json({ data: allUpdatesForAllUserProducts });
};

export const getSpecificUpdate = async (
    req: RequestWithUser,
    res: Response
) => {
    logger.info('Running getSpecificUpdate');
    const { id: updateId } = req.params;

    logger.info(`User in request: ${req!.user!.id}`);
    logger.info(`Update ID: ${updateId}`);
    const update = await prisma.productUpdate.findUnique({
        where: {
            id: updateId,
        },
    });

    if (!update) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: ReasonPhrases.NOT_FOUND,
        });
        return;
    }

    res.status(StatusCodes.OK).json({ data: update });
    return;
};
export const createUpdate = async (req: RequestWithUser, res: Response) => {
    const product = await prisma.product.findUnique({
        where: {
            id: req!.body!.productId,
        },
    });

    // this means that the product doesnt belong to the user
    if (!product) {
        res.status(StatusCodes.FORBIDDEN).json({
            error: ReasonPhrases.FORBIDDEN,
        });
        return;
    }

    const update = await prisma.productUpdate.create({
        data: {
            title: req!.body!.title,
            description: req!.body!.body,
            product: { connect: { id: product.id } },
        },
    });

    res.status(StatusCodes.CREATED).json({ data: update });
    return;
};
export const updateUpdate = async (req: RequestWithUser, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req!.user!.id,
        },
        include: {
            updates: true,
        },
    });

    const allUpdatesForUser = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, [] as ProductUpdate[]);

    const match = allUpdatesForUser.find(
        (update) => update.id === req.params.id
    );

    if (!match) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: ReasonPhrases.NOT_FOUND,
        });
        return;
    }

    const updatedUpdate = await prisma.productUpdate.update({
        where: {
            id: req.params.id,
        },
        data: {
            title: req.body.title,
            description: req.body.body,
            status: req.body.status ?? undefined,
            version: req.body.version ?? undefined,
        },
    });

    res.status(StatusCodes.OK).json({ data: updatedUpdate });
    return;
};
export const deleteUpdate = async (req: RequestWithUser, res: Response) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req!.user!.id,
        },
        include: {
            updates: true,
        },
    });

    const allUpdatesForUser = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates];
    }, [] as ProductUpdate[]);

    const match = allUpdatesForUser.find(
        (update) => update.id === req.params.id
    );

    if (!match) {
        res.status(StatusCodes.NOT_FOUND).json({
            error: ReasonPhrases.NOT_FOUND,
        });
        return;
    }

    const deleted = await prisma.productUpdate.delete({
        where: {
            id: req.params.id,
        },
    });

    res.status(StatusCodes.OK).json({ data: deleted });
    return;
};
