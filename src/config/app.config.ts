import { registerAs } from '@nestjs/config';
import { AppEnvironment } from '@/enums/env.enum';

export default registerAs('app', () => {
  return {
    nodeEnv: AppEnvironment[process.env.ENV] || AppEnvironment.DEV,
    port: parseInt(process.env.PORT || ''),
  };
});
