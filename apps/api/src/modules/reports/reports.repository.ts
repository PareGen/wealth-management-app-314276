import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Report } from '@saas-template/database';
import type { CreateReportDto, UpdateReportDto } from '@saas-template/core';

@Injectable()
export class ReportsRepository extends Repository<Report> {
  constructor(private dataSource: DataSource) {
    super(Report, dataSource.createEntityManager());
  }

  async findAll(userId: string): Promise<Report[]> {
    return this.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
  }

  async findById(id: string, userId: string): Promise<Report | null> {
    return this.findOne({
      where: { id, userId },
    });
  }

  async create(userId: string, dto: CreateReportDto): Promise<Report> {
    const report = this.create({
      ...dto,
      userId,
    });
    return this.save(report);
  }

  async update(id: string, userId: string, dto: UpdateReportDto): Promise<Report | null> {
    const report = await this.findById(id, userId);
    if (!report) {
      return null;
    }

    Object.assign(report, dto);
    return this.save(report);
  }

  async remove(id: string, userId: string): Promise<boolean> {
    const report = await this.findById(id, userId);
    if (!report) {
      return false;
    }

    await this.softRemove(report);
    return true;
  }
}
