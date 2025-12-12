import { AppEnvironment } from '@/enums/env.enum';

export const nodeEnv = process.env.ENV as AppEnvironment;
console.log('nodeenv:' + nodeEnv);
console.log('process.env.ENV:' + process.env.ENV);
export const isLocal = nodeEnv === AppEnvironment.LOCAL;
export const isDev = nodeEnv === AppEnvironment.DEV;
export const isStg = nodeEnv === AppEnvironment.STG;
export const isProd = nodeEnv === AppEnvironment.PROD;
export const isDeployed = isStg || isProd;
