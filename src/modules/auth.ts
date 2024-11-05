import { User } from '@prisma/client';
import jwt from 'jsonwebtoken';
import * as bcrypt from 'bcrypt';

// if RBAC, add role to the payload
/**
 * Generates a JSON Web Token (JWT) for the given user.
 *
 * @param user - The user object containing user details.
 * @returns A signed JWT token with the user's id and username, valid for 1 day.
 */
export const createToken = (user: User) => {
    return jwt.sign(
        { id: user.id, username: user.username },
        process.env.JWT_SECRET as string,
        { expiresIn: '1d' }
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
