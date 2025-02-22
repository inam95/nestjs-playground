import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class SystemService {
  constructor(private readonly configService: ConfigService) {}

  getSystem(): string {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    return `System with admin email: ${adminEmail}`;
  }
}
