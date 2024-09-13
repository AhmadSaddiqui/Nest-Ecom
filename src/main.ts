import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet'; // Use default import for helmet
import rateLimit from 'express-rate-limit'; // Use default import for express-rate-limit

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe for DTOs
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    transform: true,
  }));

  // Security headers
  app.use(helmet());

  // Rate limiting
  app.use(rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
  }));

  // Global prefix (optional)
  app.setGlobalPrefix('api');

  // Start the application
  await app.listen(process.env.PORT || 3000);
}

bootstrap();
