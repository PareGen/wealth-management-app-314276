import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Portfolio } from '@saas-template/database';
import { DatabaseModule } from '@/core/database/database.module';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';
import { PortfoliosRepository } from './portfolios.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Portfolio]),
    DatabaseModule,
  ],
  controllers: [PortfoliosController],
  providers: [PortfoliosService, PortfoliosRepository],
  exports: [PortfoliosService],
})
export class PortfoliosModule {}
