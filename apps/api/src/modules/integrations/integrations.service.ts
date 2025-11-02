import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateIntegrationDto, IntegrationResponseDto, UpdateIntegrationDto } from '@saas-template/core';
import type { Integration } from '@saas-template/database';
import { IntegrationsRepository } from './integrations.repository';

@Injectable()
export class IntegrationsService {
  constructor(
    private readonly integrationsRepository: IntegrationsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<IntegrationResponseDto[]> {
    const integrations = await this.integrationsRepository.findAll(userId);
    return integrations.map((integration: Integration) => this.toResponseDto(integration));
  }

  async findOne(id: string, userId: string): Promise<IntegrationResponseDto> {
    const integration = await this.integrationsRepository.findById(id, userId);
    if (!integration) {
      throw new NotFoundException('Integration not found');
    }
    return this.toResponseDto(integration);
  }

  async create(userId: string, dto: CreateIntegrationDto): Promise<IntegrationResponseDto> {
    return this.uow.execute(async () => {
      const integration = await this.integrationsRepository.create(userId, dto);
      return this.toResponseDto(integration);
    });
  }

  async update(id: string, userId: string, dto: UpdateIntegrationDto): Promise<IntegrationResponseDto> {
    return this.uow.execute(async () => {
      const integration = await this.integrationsRepository.update(id, userId, dto);
      if (!integration) {
        throw new NotFoundException('Integration not found');
      }
      return this.toResponseDto(integration);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.integrationsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Integration not found');
      }
    });
  }

  private toResponseDto(integration: Integration): IntegrationResponseDto {
    return {
      id: integration.id,
      userId: integration.userId,
      institutionName: integration.institutionName,
      apiKey: integration.apiKey,
      createdAt: integration.createdAt,
      updatedAt: integration.updatedAt,
    };
  }
}
