import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['verbose', 'debug', 'log', 'warn', 'error'],
  });
  app.enableCors();
  app.use(morgan('dev'));
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
