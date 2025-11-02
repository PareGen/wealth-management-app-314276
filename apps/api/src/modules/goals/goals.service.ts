import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateGoalDto, GoalResponseDto, UpdateGoalDto } from '@saas-template/core';
import type { Goal } from '@saas-template/database';
import { GoalsRepository } from './goals.repository';

@Injectable()
export class GoalsService {
  constructor(
    private readonly goalsRepository: GoalsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<GoalResponseDto[]> {
    const goals = await this.goalsRepository.findAll(userId);
    return goals.map((goal: Goal) => this.toResponseDto(goal));
  }

  async findOne(id: string, userId: string): Promise<GoalResponseDto> {
    const goal = await this.goalsRepository.findById(id, userId);
    if (!goal) {
      throw new NotFoundException('Goal not found');
    }
    return this.toResponseDto(goal);
  }

  async create(userId: string, dto: CreateGoalDto): Promise<GoalResponseDto> {
    return this.uow.execute(async () => {
      const goal = await this.goalsRepository.create(userId, dto);
      return this.toResponseDto(goal);
    });
  }

  async update(id: string, userId: string, dto: UpdateGoalDto): Promise<GoalResponseDto> {
    return this.uow.execute(async () => {
      const goal = await this.goalsRepository.update(id, userId, dto);
      if (!goal) {
        throw new NotFoundException('Goal not found');
      }
      return this.toResponseDto(goal);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.goalsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Goal not found');
      }
    });
  }

  private toResponseDto(goal: Goal): GoalResponseDto {
    return {
      id: goal.id,
      userId: goal.userId,
      description: goal.description,
      targetAmount: goal.targetAmount,
      dueDate: goal.dueDate,
      createdAt: goal.createdAt,
      updatedAt: goal.updatedAt,
    };
  }
}
