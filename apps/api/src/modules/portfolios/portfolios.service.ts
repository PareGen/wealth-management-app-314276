import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreatePortfolioDto, PortfolioResponseDto, UpdatePortfolioDto } from '@saas-template/core';
import type { Portfolio } from '@saas-template/database';
import { PortfoliosRepository } from './portfolios.repository';

@Injectable()
export class PortfoliosService {
  constructor(
    private readonly portfoliosRepository: PortfoliosRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<PortfolioResponseDto[]> {
    const portfolios = await this.portfoliosRepository.findAll(userId);
    return portfolios.map((portfolio: Portfolio) => this.toResponseDto(portfolio));
  }

  async findOne(id: string, userId: string): Promise<PortfolioResponseDto> {
    const portfolio = await this.portfoliosRepository.findById(id, userId);
    if (!portfolio) {
      throw new NotFoundException('Portfolio not found');
    }
    return this.toResponseDto(portfolio);
  }

  async create(userId: string, dto: CreatePortfolioDto): Promise<PortfolioResponseDto> {
    return this.uow.execute(async () => {
      const portfolio = await this.portfoliosRepository.create(userId, dto);
      return this.toResponseDto(portfolio);
    });
  }

  async update(id: string, userId: string, dto: UpdatePortfolioDto): Promise<PortfolioResponseDto> {
    return this.uow.execute(async () => {
      const portfolio = await this.portfoliosRepository.update(id, userId, dto);
      if (!portfolio) {
        throw new NotFoundException('Portfolio not found');
      }
      return this.toResponseDto(portfolio);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.portfoliosRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Portfolio not found');
      }
    });
  }

  private toResponseDto(portfolio: Portfolio): PortfolioResponseDto {
    return {
      id: portfolio.id,
      userId: portfolio.userId,
      name: portfolio.name,
      createdAt: portfolio.createdAt,
      updatedAt: portfolio.updatedAt,
    };
  }
}
