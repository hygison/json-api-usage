import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { AppEnvironment } from '@/enums/env.enum';

export default registerAs('app', () => {
  const nodeEnv = process.env.ENV as keyof typeof AppEnvironment;
  return {
    nodeEnv: AppEnvironment[nodeEnv] || AppEnvironment.DEV,
    port: Number(process.env.APP_PORT),
  };
});
