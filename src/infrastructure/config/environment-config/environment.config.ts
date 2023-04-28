import * as env from 'env-var';
import { config } from 'dotenv';
import { IEnvironmentInterface } from '../../../domain/config/environment.interface';

config();
class EnvironmentConfig implements IEnvironmentInterface {
  getPort(): number {
    return env.get('PORT').asInt() || 3000;
  }

  getEnvironment(): string {
    return env.get('NODE_ENV').asString();
  }

  getPostgresURL(): string {
    return env.get('POSTGRES_DB_URL').asString();
  }

  getRedisPort(): number {
    return env.get('REDIS_PORT').asInt();
  }

  getRedisURL(): string {
    return env.get('REDIS_HOST').asString();
  }

  getRedisPassword(): string {
    return env.get('REDIS_PASSWORD').asString();
  }
}

export const envConfig = new EnvironmentConfig();
