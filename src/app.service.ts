import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testApi() {
    return {
      message: 'Success',
      nodeVersion: process.version,
      documentation: '/docs',
    };
  }
}
