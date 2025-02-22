import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  getUsers(): string {
    return 'All users';
  }
}
