import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getBodyParserOptions } from '@nestjs/platform-express/adapters/utils/get-body-parser-options.util';
import { json, urlencoded } from 'express';
import * as qs from 'qs';
import { TransformInterceptor } from '@/interceptors/transform.interceptor';
import { AppModule } from '@/modules/app.module';
import { swaggerDocs } from '@/swagger/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

  const maxSize = '250mb';

  app.use(json(getBodyParserOptions(true, { limit: maxSize })));
  app.use(urlencoded({ limit: maxSize, extended: true }));
  app.set('query parser', (value: string) => qs.parse(value, { allowDots: true }));
  swaggerDocs(app);
  app.useGlobalInterceptors(new TransformInterceptor());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidUnknownValues: true,
      stopAtFirstError: true,
      validateCustomDecorators: true,
    }),
  );

  const configService = app.get(ConfigService);

  const port = configService.get('APP_PORT');
  app.enableCors();
  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}

bootstrap();
