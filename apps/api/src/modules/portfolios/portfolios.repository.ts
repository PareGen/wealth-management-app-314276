import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Portfolio } from '@saas-template/database';
import type { CreatePortfolioDto, UpdatePortfolioDto } from '@saas-template/core';

@Injectable()
export class PortfoliosRepository extends Repository<Portfolio> {
  constructor(private dataSource: DataSource) {
    super(Portfolio, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Portfolio[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Portfolio | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreatePortfolioDto): Promise<Portfolio> {
    const portfolio = this.create({
      ...dto,
      userId,
    });
    return this.save(portfolio);
  }

  async update(id: string, userId: string, dto: UpdatePortfolioDto): Promise<Portfolio | null> {
    const portfolio = await this.findById(id, userId);
    if (!portfolio) {
      return null;
    }

    Object.assign(portfolio, dto);
    return this.save(portfolio);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const portfolio = await this.findById(id, userId);
    if (!portfolio) {
      return false;
    }

    await this.softRemove(portfolio);
    return true;
  }
}
