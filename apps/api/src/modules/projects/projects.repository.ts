import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { UpdateProjectDto } from '@saas-template/core';
import { Project } from '@saas-template/database';
import type { Repository } from 'typeorm';

@Injectable()
export class ProjectsRepository {
  constructor(
    @InjectRepository(Project)
    private readonly repository: Repository<Project>
  ) {}

  async findAll(userId: string): Promise<Project[]> {
    return this.repository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Project | null> {
    return this.repository.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, name: string, description?: string): Promise<Project> {
    const project = this.repository.create({
      userId,
      name,
      description: description ?? '',
    });
    return this.repository.save(project);
  }

  async update(id: string, userId: string, data: UpdateProjectDto): Promise<Project | null> {
    const project = await this.findById(id, userId);
    if (!project) {
      return null;
    }
    Object.assign(project, data);
    return this.repository.save(project);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const project = await this.findById(id, userId);
    if (!project) {
      return false;
    }
    await this.repository.softRemove(project);
    return true;
  }
}
