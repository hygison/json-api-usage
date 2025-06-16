import { readFileSync } from 'fs';
import { JwtModuleOptions, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import 'dotenv/config';

const secret = process.env.JWT_SECRET;
const privateKey = readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8');
const publicKey = readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf8');
const ttl = process.env.JWT_ACCESS_TOKEN_TTL;

export const JWT_VERIFY_OPTIONS: JwtVerifyOptions = {
  algorithms: ['RS256'],
  publicKey: publicKey,
};

export const JWT_SIGN_IN_OPTIONS: JwtSignOptions = {
  algorithm: 'RS256',
  privateKey: privateKey,
};

export const JWT_MODULE_OPTIONS: JwtModuleOptions = {
  secret: secret,
  privateKey: privateKey,
  publicKey: publicKey,
  signOptions: {
    expiresIn: parseInt(ttl),
  },
};
