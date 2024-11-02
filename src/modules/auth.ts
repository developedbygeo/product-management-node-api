import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';

// if RBAC, add role to the payload
export const createToken = (user: User) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: '1d' }
    );
};
