import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Investment } from '@saas-template/database';
import type { CreateInvestmentDto, UpdateInvestmentDto } from '@saas-template/core';

@Injectable()
export class InvestmentsRepository extends Repository<Investment> {
  constructor(private dataSource: DataSource) {
    super(Investment, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Investment[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Investment | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateInvestmentDto): Promise<Investment> {
    const investment = this.create({
      ...dto,
      userId,
    });
    return this.save(investment);
  }

  async update(id: string, userId: string, dto: UpdateInvestmentDto): Promise<Investment | null> {
    const investment = await this.findById(id, userId);
    if (!investment) {
      return null;
    }

    Object.assign(investment, dto);
    return this.save(investment);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const investment = await this.findById(id, userId);
    if (!investment) {
      return false;
    }

    await this.softRemove(investment);
    return true;
  }
}
