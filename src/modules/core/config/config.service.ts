import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEnv } from './env.schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<TEnv, true>) {
    // Second generic param enables type inference
  }

  private get<T extends keyof TEnv>(key: T): TEnv[T] {
    return this.configService.get(key, { infer: true });
  }

  get appName() {
    return this.get('APP_NAME');
  }

  get port() {
    return this.get('PORT');
  }

  get nodeEnv() {
    return this.get('NODE_ENV');
  }

  get isProduction() {
    return this.get('NODE_ENV') === 'production';
  }
}
