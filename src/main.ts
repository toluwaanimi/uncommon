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
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // interceptors
  app.useGlobalInterceptors(new LoggingInterceptor(new LoggerService()));
  bullDashboard(app);

  if (envConfig.getEnvironment() !== 'production') {
    setupSwagger(app);
  }

  app.enable('trust proxy', 1);
  app.disable('x-powered-by');

  app.enableCors();
  await app.listen(envConfig.getPort());

  Logger.log('Uncommon running on port: ' + envConfig.getPort());
}
bootstrap().then();
