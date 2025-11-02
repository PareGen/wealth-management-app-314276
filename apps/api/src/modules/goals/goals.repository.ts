import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Goal } from '@saas-template/database';
import type { CreateGoalDto, UpdateGoalDto } from '@saas-template/core';

@Injectable()
export class GoalsRepository extends Repository<Goal> {
  constructor(private dataSource: DataSource) {
    super(Goal, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Goal[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Goal | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateGoalDto): Promise<Goal> {
    const goal = this.create({
      ...dto,
      userId,
    });
    return this.save(goal);
  }

  async update(id: string, userId: string, dto: UpdateGoalDto): Promise<Goal | null> {
    const goal = await this.findById(id, userId);
    if (!goal) {
      return null;
    }

    Object.assign(goal, dto);
    return this.save(goal);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const goal = await this.findById(id, userId);
    if (!goal) {
      return false;
    }

    await this.softRemove(goal);
    return true;
  }
}
