import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

import prisma from '../db';
import { comparePasswords, createToken, hashPassword } from '../modules/auth';
import { CreateUserRequest, SignInUserRequest } from '../types/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { sendRejectionResponse } from '../modules/responses';

export const createUserHandler = async (
    req: CreateUserRequest,
    res: Response
) => {
    try {
        const user = await prisma.user.create({
            data: {
                username: req.body.username,
                email: req.body.email,
                password: await hashPassword(req.body.password),
            },
        });

        const token = createToken(user);

        res.json({ token });
    } catch (err: unknown | PrismaClientKnownRequestError) {
        if (
            err instanceof Prisma.PrismaClientKnownRequestError &&
            err.code === 'P2002'
        ) {
            sendRejectionResponse(
                res,
                StatusCodes.CONFLICT,
                ReasonPhrases.CONFLICT
            );
        } else {
            sendRejectionResponse(
                res,
                StatusCodes.INTERNAL_SERVER_ERROR,
                ReasonPhrases.UNPROCESSABLE_ENTITY
            );
        }
    }
};

export const logInHandler = async (req: SignInUserRequest, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.body.email },
    });

    if (!user)
        sendRejectionResponse(
            res,
            StatusCodes.NOT_FOUND,
            ReasonPhrases.NOT_FOUND
        );

    const isUserValid = await comparePasswords(
        req.body.password,
        user!.password
    );

    if (!isUserValid)
        sendRejectionResponse(
            res,
            StatusCodes.UNAUTHORIZED,
            ReasonPhrases.UNAUTHORIZED
        );

    const token = createToken(user!);
    res.json({ token });
};
