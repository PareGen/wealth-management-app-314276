import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Investment } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { InvestmentsController } from './investments.controller';
import { InvestmentsService } from './investments.service';
import { InvestmentsRepository } from './investments.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Investment]),
    DatabaseModule,
  ],
  controllers: [InvestmentsController],
  providers: [InvestmentsService, InvestmentsRepository],
  exports: [InvestmentsService],
})
export class InvestmentsModule {}
