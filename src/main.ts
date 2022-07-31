import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { appContants } from './constants/app.constant';
import { Swagger } from './infra/docs/swagger.doc';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const logger = new Logger(`${appContants.appName}/${bootstrap.name}`);

  app.useGlobalPipes(
    new ValidationPipe({
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  logger.verbose(`Starting app 🚀`);

  Swagger.bootstrap(app);

  app.enableCors();

  const configService = app.get(ConfigService);
  const { port } = configService.get('app');

  await app.listen(port);
  const url = await app.getUrl();

  logger.verbose(`Swagger application is running on: ${url}/swagger`);
}
bootstrap();
