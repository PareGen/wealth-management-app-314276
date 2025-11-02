import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Integration } from '@saas-template/database';
import type { CreateIntegrationDto, UpdateIntegrationDto } from '@saas-template/core';

@Injectable()
export class IntegrationsRepository extends Repository<Integration> {
  constructor(private dataSource: DataSource) {
    super(Integration, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Integration[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Integration | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateIntegrationDto): Promise<Integration> {
    const integration = this.create({
      ...dto,
      userId,
    });
    return this.save(integration);
  }

  async update(id: string, userId: string, dto: UpdateIntegrationDto): Promise<Integration | null> {
    const integration = await this.findById(id, userId);
    if (!integration) {
      return null;
    }

    Object.assign(integration, dto);
    return this.save(integration);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const integration = await this.findById(id, userId);
    if (!integration) {
      return false;
    }

    await this.softRemove(integration);
    return true;
  }
}
