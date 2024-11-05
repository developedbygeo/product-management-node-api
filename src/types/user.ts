import jwt from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '@prisma/client';

export type RequestWithUser = Request & {
    user?: string | jwt.JwtPayload;
};

export type CreateUserRequest = Omit<Request, 'body'> & {
    body: {
        username: User['username'];
        email: User['email'];
        password: User['password'];
    };
};

export type SignInUserRequest = Omit<Request, 'body'> & {
    body: {
        email: User['email'];
        password: User['password'];
    };
};
