import { Injectable } from '@nestjs/common';
import { AppConfigService } from './modules/core/config/config.service';

@Injectable()
export class AppService {
  constructor(private readonly appConfigService: AppConfigService) {}

  getHello(): string {
    return `Hello World! ${this.appConfigService.appName}`;
  }
}
