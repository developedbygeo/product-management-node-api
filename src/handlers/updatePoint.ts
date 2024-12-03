import { ReasonPhrases, StatusCodes } from 'http-status-codes';
import { NextFunction, Response } from 'express';
import prisma from '../db';
import { RequestWithUser } from '../types/user';
import { logger } from '../utils/logger';
import { ProductUpdate } from '@prisma/client';

export const getUpdatePoints = async (req: RequestWithUser, res: Response) => {
    try {
        logger.info(`User in request: ${req!.user!.id}`);

        const products = await prisma.product.findMany({
            where: {
                belongsToId: req!.user!.id,
            },
            include: {
                updates: {
                    include: {
                        updatePoints: true,
                    },
                },
            },
        });

        const updatesWithPoints = products.flatMap((product) =>
            product.updates.map((update) => ({
                updateId: update.id,
                title: update.title,
                description: update.description,
                status: update.status,
                version: update.version,
                createdAt: update.createdAt,
                updatedAt: update.updatedAt,
                updatePoints: update.updatePoints.map((point) => ({
                    id: point.id,
                    name: point.name,
                    description: point.description,
                    createdAt: point.createdAt,
                    updatedAt: point.updatedAt,
                })),
            }))
        );

        res.status(StatusCodes.OK).json({
            data: updatesWithPoints,
        });
    } catch (error) {
        logger.error('Error fetching update points:', { error });
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            error: 'Failed to fetch update points',
        });
    }
};

export const getSpecificUpdatePoint = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const { id: updatePointId } = req.params;

        logger.info(`User in request: ${req!.user!.id}`);
        logger.info(`Update point ID: ${updatePointId}`);

        const updatePoint = await prisma.updatePoint.findUnique({
            where: {
                id: updatePointId,
            },
        });

        if (!updatePoint) {
            res.status(StatusCodes.NOT_FOUND).json({
                error: ReasonPhrases.NOT_FOUND,
            });
        }

        res.status(StatusCodes.OK).json({ data: updatePoint });
    } catch (error) {
        logger.error('Error fetching update point:', { error });
        next(error);
    }
};

export const createUpdatePoint = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        const { updateId } = req.body;

        const update = await prisma.productUpdate.findUnique({
            where: {
                id: updateId,
            },
            include: {
                product: {
                    include: {
                        belongsTo: true,
                    },
                },
            },
        });

        // If the update doesn't exist or doesn't belong to the user
        if (!update || update.product.belongsTo.id !== req!.user!.id) {
            res.status(StatusCodes.FORBIDDEN).json({
                error: ReasonPhrases.FORBIDDEN,
            });
            return;
        }

        const updatePoint = await prisma.updatePoint.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                update: { connect: { id: update.id } },
            },
        });

        res.status(StatusCodes.CREATED).json({ data: updatePoint });
    } catch (err) {
        logger.error('Error creating update point:', { error: err });
        next(err);
    }
};

export const deleteUpdatePoint = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        logger.info('Running deleteUpdatePoint');

        const { id: updatePointId } = req.params;

        logger.info(`User in request: ${req!.user!.id}`);
        logger.info(`UpdatePoint ID: ${updatePointId}`);

        const updatePoint = await prisma.updatePoint.findUnique({
            where: { id: updatePointId },
            include: {
                update: {
                    include: {
                        product: {
                            include: {
                                belongsTo: true,
                            },
                        },
                    },
                },
            },
        });

        if (!updatePoint) {
            res.status(StatusCodes.NOT_FOUND).json({
                error: ReasonPhrases.NOT_FOUND,
            });
            return;
        }

        if (updatePoint.update.product.belongsTo.id !== req!.user!.id) {
            res.status(StatusCodes.FORBIDDEN).json({
                error: ReasonPhrases.FORBIDDEN,
            });
            return;
        }

        const deletedUpdatePoint = await prisma.updatePoint.delete({
            where: { id: updatePointId },
        });

        res.status(StatusCodes.OK).json({
            data: deletedUpdatePoint,
        });
    } catch (err) {
        logger.error('Error deleting update point:', { error: err });
        next(err);
    }
};

export const updateUpdatePoint = async (
    req: RequestWithUser,
    res: Response,
    next: NextFunction
) => {
    try {
        logger.info('Running updateUpdatePoint');

        const { id: updatePointId } = req.params;
        const { name, description } = req.body;

        logger.info(`User in request: ${req!.user!.id}`);
        logger.info(`UpdatePoint ID: ${updatePointId}`);

        const updatePoint = await prisma.updatePoint.findUnique({
            where: { id: updatePointId },
            include: {
                update: {
                    include: {
                        product: {
                            include: {
                                belongsTo: true,
                            },
                        },
                    },
                },
            },
        });

        if (!updatePoint) {
            res.status(StatusCodes.NOT_FOUND).json({
                error: ReasonPhrases.NOT_FOUND,
            });
            return;
        }

        if (updatePoint.update.product.belongsTo.id !== req!.user!.id) {
            res.status(StatusCodes.FORBIDDEN).json({
                error: ReasonPhrases.FORBIDDEN,
            });
            return;
        }

        const updatedUpdatePoint = await prisma.updatePoint.update({
            where: { id: updatePointId },
            data: {
                name: name || updatePoint.name,
                description: description || updatePoint.description,
            },
        });

        res.status(StatusCodes.OK).json({
            data: updatedUpdatePoint,
        });
    } catch (err) {
        logger.error('Error updating update point:', { error: err });
        next(err);
    }
};
