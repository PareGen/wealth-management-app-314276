import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Goal } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { GoalsRepository } from './goals.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Goal]),
    DatabaseModule,
  ],
  controllers: [GoalsController],
  providers: [GoalsService, GoalsRepository],
  exports: [GoalsService],
})
export class GoalsModule {}
