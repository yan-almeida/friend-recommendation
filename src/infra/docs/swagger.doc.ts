import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';

export class Swagger {
  static bootstrap(app: INestApplication) {
    const { config, customDocs, options, uri } = Swagger.internalConfigs;

    const document = SwaggerModule.createDocument(app, config, options);

    SwaggerModule.setup(uri, app, document, customDocs);
  }

  private static get internalConfigs() {
    const config = new DocumentBuilder()
      .setTitle('WEB API - Friend Recommendation')
      .setDescription('API responsável: Yan Almeida')
      .setVersion('1.0')
      .build();

    const options: SwaggerDocumentOptions = {
      deepScanRoutes: true,
    };

    const customDocs = {
      swaggerOptions: {
        persistAuthorization: true,
      },
      customSiteTitle: 'Friend Recommendation - API Docs',
    };

    const uri = 'swagger';

    return {
      config,
      customDocs,
      options,
      uri,
    };
  }
}
