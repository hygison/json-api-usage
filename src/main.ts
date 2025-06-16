import 'dotenv/config';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from '@/modules/app.module';
import { TransformInterceptor } from '@/interceptors/transform.interceptor';
import { swaggerDocs } from '@/swagger/swagger';

async function bootstrap() {
  const app: NestExpressApplication = await NestFactory.create(AppModule);

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

  const port = configService.get('PORT');
  app.enableCors();
  await app.listen(port, () => {
    console.log(`Application running at ${port}`);
  });
}

bootstrap();
