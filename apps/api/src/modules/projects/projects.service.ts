import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateProjectDto, ProjectResponseDto, UpdateProjectDto } from '@saas-template/core';
import type { Project } from '@saas-template/database';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly projectsRepository: ProjectsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ProjectResponseDto[]> {
    const projects = await this.projectsRepository.findAll(userId);
    return projects.map((project: Project) => this.toResponseDto(project));
  }

  async findOne(id: string, userId: string): Promise<ProjectResponseDto> {
    const project = await this.projectsRepository.findById(id, userId);
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return this.toResponseDto(project);
  }

  async create(userId: string, dto: CreateProjectDto): Promise<ProjectResponseDto> {
    return this.uow.execute(async () => {
      const project = await this.projectsRepository.create(userId, dto.name, dto.description);
      return this.toResponseDto(project);
    });
  }

  async update(id: string, userId: string, dto: UpdateProjectDto): Promise<ProjectResponseDto> {
    return this.uow.execute(async () => {
      const project = await this.projectsRepository.update(id, userId, dto);
      if (!project) {
        throw new NotFoundException('Project not found');
      }
      return this.toResponseDto(project);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.projectsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Project not found');
      }
    });
  }

  private toResponseDto(project: Project): ProjectResponseDto {
    return {
      id: project.id,
      name: project.name,
      description: project.description,
      userId: project.userId,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };
  }
}
