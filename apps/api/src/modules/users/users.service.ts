import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import type { User } from '@saas-template/database';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async findByEmail(email: string): Promise<User | null> {
    return this.usersRepository.findByEmail(email);
  }

  async findById(id: string): Promise<User> {
    const user = await this.usersRepository.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async createUser(email: string, hashedPassword: string): Promise<User> {
    const exists = await this.usersRepository.existsByEmail(email);
    if (exists) {
      throw new ConflictException('User with this email already exists');
    }
    return this.usersRepository.create(email, hashedPassword);
  }
}
