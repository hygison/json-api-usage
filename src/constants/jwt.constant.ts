import { readFileSync } from 'fs';
import { JwtModuleOptions, JwtSignOptions, JwtVerifyOptions } from '@nestjs/jwt';
import 'dotenv/config';

// Allow either path-based keys or inline PEM in env vars.
const secret = process.env.JWT_SECRET ?? '';
const privateKey = process.env.JWT_PRIVATE_KEY_PATH
  ? readFileSync(process.env.JWT_PRIVATE_KEY_PATH, 'utf8')
  : (process.env.JWT_PRIVATE_KEY ?? '');
const publicKey = process.env.JWT_PUBLIC_KEY_PATH
  ? readFileSync(process.env.JWT_PUBLIC_KEY_PATH, 'utf8')
  : (process.env.JWT_PUBLIC_KEY ?? '');
const ttl = process.env.JWT_ACCESS_TOKEN_TTL ?? '3600';

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
    expiresIn: parseInt(ttl, 10),
  },
};
