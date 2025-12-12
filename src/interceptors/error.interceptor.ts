import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { isNil } from 'lodash';
import { isDev, isLocal } from '@/constants/env.constant';

@Catch()
export class ErrorInterceptor implements ExceptionFilter {
  constructor() {}
  private readonly logger = new Logger(ErrorInterceptor.name);

  async catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const defaultError = {
      code: 500,
      message: 'Internal Server Error',
    };
    const status = Number(exception.getStatus ? exception.getStatus() : defaultError.code);

    const errorObject = {
      message: `Incoming request - ${request.method} - ${request.url}`,
      method: request.method,
      url: request.url,
      body: request.body || {},
      headers: request.headers || {},
      status: status,
      error: {
        response: {
          statusCode: status,
          message: exception instanceof HttpException ? exception.getResponse() : defaultError.message,
        },
        status: status,
        message: exception instanceof HttpException ? exception.message : defaultError.message,
        ...((isLocal || isDev) && exception?.stack ? { stack: exception.stack } : {}),
      },
    };

    const removedKeysFromObject = JSON.parse(this.removeEnv(JSON.stringify(this.removeKeys(errorObject))));
    const stringForLogs =
      isLocal || isDev ? JSON.stringify(removedKeysFromObject, null, 2) : JSON.stringify(removedKeysFromObject);
    const isError = status >= 500;
    if (isError) {
      this.logger.error(stringForLogs);
    } else {
      this.logger.log(stringForLogs);
    }

    response.status(status).json(removedKeysFromObject?.error);
  }

  private removeKeys(obj: any) {
    try {
      const keys = ['password'];
      if (!isNil(obj) && typeof obj === 'object') {
        Object.keys(obj).forEach((key) => {
          if (typeof obj[key] === 'object') {
            this.removeKeys(obj[key]);
          } else if (keys.includes(key)) {
            obj[key] = this.generateAsteriskString();
          }
        });
      }
    } catch (e) {
      Logger.error('Error removing keys from object in ErrorInterceptor', e);
    }

    return obj;
  }

  private removeEnv(string: string) {
    const env = process.env as { [key: string]: string | undefined };
    const keys = [
      'DB_PASSWORD',
      'SMTP_HOST',
      'SMTP_PASSWORD',
      'JWT_SECRET',
      'AWS_ACCESS_KEY_ID',
      'AWS_SECRET_ACCESS_KEY',
    ];

    try {
      for (const key in env) {
        if (keys.includes(key) && env[key]) {
          string = string.replaceAll(env[key], this.generateAsteriskString());
        }
      }
    } catch (e) {
      Logger.error('Error removing env variables from string in ErrorInterceptor', e);
    }

    return string;
  }

  private generateAsteriskString(): string {
    const length = Math.floor(Math.random() * (25 - 8 + 1)) + 8; // Random number between 8 and 25
    return '*'.repeat(length);
  }
}
