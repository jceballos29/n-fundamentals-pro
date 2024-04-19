import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from './services/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: false,
    cors: {
      origin: '*',
      methods: 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
      allowedHeaders: 'Content-Type, Authorization',
    },
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      // forbidNonWhitelisted: true,
    }),
  );
  await app.listen(process.env.PORT || 3000, () => {
    const logger = app.get(LoggerService);
    logger.info(
      `Server running on http://localhost:${process.env.PORT || 3000}`,
    );
  });
}
bootstrap();
