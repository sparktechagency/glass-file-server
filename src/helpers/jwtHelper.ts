import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

const createToken = (payload: object, secret: Secret, expireTime: string) => {
    if (!secret) throw new Error("JWT secret must be provided!");
    // @ts-ignore
    return jwt.sign(payload, secret, { expiresIn: expireTime });
};

const verifyToken = (token: string, secret: Secret) => {
    if (!secret) throw new Error("JWT secret must be provided!");
    return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = { createToken, verifyToken };