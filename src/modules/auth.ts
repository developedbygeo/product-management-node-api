import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';
import config from '../config';

// if RBAC, add role to the payload
export const createToken = (user: User) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        config.secrets.jwt as string,
        { expiresIn: config.secrets.jwtExp }
    );
};

/**
 * Compares a plain text password with a hashed password.
 *
 * @param incomingPlainTextPwd - The plain text password to compare.
 * @param hashedPwd - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePasswords = async (
    incomingPlainTextPwd: string,
    hashedPwd: string
) => await bcrypt.compare(incomingPlainTextPwd, hashedPwd);

/**
 * Hashes a plain text password using bcrypt with a salt rounds value of 10.
 *
 * @param incomingPlainTextPwd - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (incomingPlainTextPwd: string) =>
    await bcrypt.hash(incomingPlainTextPwd, 10);
