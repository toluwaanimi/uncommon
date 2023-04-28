import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { Logger, ValidationPipe } from '@nestjs/common';
import { LoggingInterceptor } from './infrastructure/common/interceptors/logger.interceptor';
import { LoggerService } from './infrastructure/logger/logger.service';
import { envConfig } from './infrastructure/config/environment-config/environment.config';
import { setupSwagger } from './infrastructure/common/swagger';
import { bullDashboard } from './infrastructure/common/bull-dashboard/bull-dashboard';

async function bootstrap() {
  // Create a NestJS application instance
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Use global ValidationPipe for request validation
  app.useGlobalPipes(new ValidationPipe());

  // Enable request validation by whitelisting only known properties
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Register LoggingInterceptor to log incoming requests using LoggerService
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));

  // Add Bull dashboard for monitoring and managing background jobs
  bullDashboard(app);

  // Set up Swagger for API documentation if not in production environment
  if (envConfig.getEnvironment() !== 'production') {
    setupSwagger(app);
  }

  // Enable the "trust proxy" setting for reverse proxy support
  app.enable('trust proxy', 1);

  // Disable the "x-powered-by" header for security reasons
  app.disable('x-powered-by');

  // Enable Cross-Origin Resource Sharing (CORS) for handling requests from different origins
  app.enableCors();

  // Start the application, listening on the configured port
  await app.listen(envConfig.getPort());

  // Log the current port the application is running on
  Logger.log('Uncommon running on port: ' + envConfig.getPort());
}

// Bootstrap the NestJS application
bootstrap().then();
