import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import '@/common/infra/utils/debug';
import '@/database/infra/typeorm/extensions/extensions';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  const corsOptions: CorsOptions = {
    origin: 'https://app-lalak.docker.localhost',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  await app.listen(3000);
}
bootstrap();
