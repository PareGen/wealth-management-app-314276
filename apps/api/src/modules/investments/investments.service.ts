import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateInvestmentDto, InvestmentResponseDto, UpdateInvestmentDto } from '@saas-template/core';
import type { Investment } from '@saas-template/database';
import { InvestmentsRepository } from './investments.repository';

@Injectable()
export class InvestmentsService {
  constructor(
    private readonly investmentsRepository: InvestmentsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<InvestmentResponseDto[]> {
    const investments = await this.investmentsRepository.findAll(userId);
    return investments.map((investment: Investment) => this.toResponseDto(investment));
  }

  async findOne(id: string, userId: string): Promise<InvestmentResponseDto> {
    const investment = await this.investmentsRepository.findById(id, userId);
    if (!investment) {
      throw new NotFoundException('Investment not found');
    }
    return this.toResponseDto(investment);
  }

  async create(userId: string, dto: CreateInvestmentDto): Promise<InvestmentResponseDto> {
    return this.uow.execute(async () => {
      const investment = await this.investmentsRepository.create(userId, dto);
      return this.toResponseDto(investment);
    });
  }

  async update(id: string, userId: string, dto: UpdateInvestmentDto): Promise<InvestmentResponseDto> {
    return this.uow.execute(async () => {
      const investment = await this.investmentsRepository.update(id, userId, dto);
      if (!investment) {
        throw new NotFoundException('Investment not found');
      }
      return this.toResponseDto(investment);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.investmentsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Investment not found');
      }
    });
  }

  private toResponseDto(investment: Investment): InvestmentResponseDto {
    return {
      id: investment.id,
      portfolioId: investment.portfolioId,
      name: investment.name,
      amount: investment.amount,
      investmentDate: investment.investmentDate,
      createdAt: investment.createdAt,
      updatedAt: investment.updatedAt,
    };
  }
}
