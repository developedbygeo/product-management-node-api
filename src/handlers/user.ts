import { Response } from 'express';

import prisma from '../db';
import { comparePasswords, createToken, hashPassword } from '../modules/auth';
import { CreateUserRequest, SignInUserRequest } from '../types/user';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { Prisma } from '@prisma/client';
import { sendRejectionResponse } from '../modules/responses';
import { API_RESPONSE_MESSAGES } from '../constants/messages';

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
                409,
                API_RESPONSE_MESSAGES.USER_EMAIL_EXISTS
            );
        } else {
            sendRejectionResponse(
                res,
                500,
                API_RESPONSE_MESSAGES.GENERAL_ERROR
            );
        }
    }
};

export const logInHandler = async (req: SignInUserRequest, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { email: req.body.email },
    });

    if (!user)
        sendRejectionResponse(res, 404, API_RESPONSE_MESSAGES.USER_NOT_FOUND);

    const isUserValid = await comparePasswords(
        req.body.password,
        user!.password
    );

    if (!isUserValid)
        sendRejectionResponse(
            res,
            401,
            API_RESPONSE_MESSAGES.USER_INVALID_PASSWORD
        );

    const token = createToken(user!);
    res.json({ token });
};
