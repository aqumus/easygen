import { Injectable } from '@nestjs/common';
import { SignupDto } from '../auth/auth.dto';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: '1',
      email: 'john@gmail.com',
      password: 'changeme',
      name: 'John Doe',
    },
    {
      userId: '2',
      email: 'maria@gmail.com',
      password: 'guess',
      name: 'Maria Doe',
    },
  ];

  async findOne(email: string): Promise<User | undefined> {
    return this.users.find((user) => user.email === email);
  }

  async create(body: SignupDto) {
    const user = {
      userId: '' + (this.users.length + 1),
      ...body,
    };
    this.users.push(user);
    return user;
  }
}
