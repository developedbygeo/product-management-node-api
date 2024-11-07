import jwt, { JwtPayload } from 'jsonwebtoken';
import { Request } from 'express';
import { User } from '@prisma/client';

export type RequestWithUser = Request & {
    user?: ExtractedUserFromJwt;
};

export type ExtractedUserFromJwt = JwtPayload & Pick<User, 'id' | 'username'>;

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
