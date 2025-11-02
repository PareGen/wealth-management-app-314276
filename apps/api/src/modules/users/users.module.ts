import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '@saas-template/database';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService, UsersRepository, UnitOfWork],
  exports: [UsersService, UsersRepository],
})
export class UsersModule {}
