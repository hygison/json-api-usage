import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const swaggerDocs = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('Docs Swagger').setVersion('1.0.0').addBearerAuth().build();

  SwaggerModule.setup('swagger', app, () => SwaggerModule.createDocument(app, config), {});
};
