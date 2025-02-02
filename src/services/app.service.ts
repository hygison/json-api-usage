import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  testApi() {
    return {
      nodeEnv: process.env.NODE_ENV,
      nodeVersion: process.version,
      message: 'Success',
      documentation: '/swagger',
    };
  }
}
