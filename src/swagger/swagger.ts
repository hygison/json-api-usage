import * as fs from 'fs';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerDocumentOptions, SwaggerModule } from '@nestjs/swagger';

export const swaggerDocs = (app: INestApplication) => {
  const config = new DocumentBuilder().setTitle('Docs Swagger').setVersion('1.0.0').addBearerAuth().build();

  const options: SwaggerDocumentOptions = {
    operationIdFactory: (controllerKey: string, methodKey: string) => methodKey,
  };
  const document = SwaggerModule.createDocument(app, config, options);
  document.openapi = '3.1.0';
  fs.writeFileSync(`swagger.json`, JSON.stringify(document, null, 2));
  // SwaggerModule.setup('swagger', app, () => SwaggerModule.createDocument(app, config), {});
  SwaggerModule.setup('swagger', app, { ...document, openapi: '3.1.0' });
};
