import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { AppEnvironment } from '@/enums/env.enum';

export default registerAs('app', () => {
  return {
    nodeEnv: AppEnvironment[process.env.NODE_ENV] || AppEnvironment.DEV,
    port: Number(process.env.PORT),
  };
});
