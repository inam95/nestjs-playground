import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TEnv } from './env.schema';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService<TEnv, true>) {}

  private get<T extends keyof TEnv>(key: T): TEnv[T] {
    return this.configService.get(key, { infer: true });
  }

  get appName(): string {
    return this.configService.get<string>('APP_NAME');
  }

  get port(): number {
    return this.configService.get<number>('PORT');
  }

  get nodeEnv(): string {
    return this.configService.get<string>('NODE_ENV');
  }

  get isProduction(): boolean {
    return this.configService.get('NODE_ENV') === 'production';
  }
}
