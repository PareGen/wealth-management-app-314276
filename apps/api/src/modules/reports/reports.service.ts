import { UnitOfWork } from '@/core/database/unit-of-work.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import type { CreateReportDto, ReportResponseDto, UpdateReportDto } from '@saas-template/core';
import type { Report } from '@saas-template/database';
import { ReportsRepository } from './reports.repository';

@Injectable()
export class ReportsService {
  constructor(
    private readonly reportsRepository: ReportsRepository,
    private readonly uow: UnitOfWork
  ) {}

  async findAll(userId: string): Promise<ReportResponseDto[]> {
    const reports = await this.reportsRepository.findAll(userId);
    return reports.map((report: Report) => this.toResponseDto(report));
  }

  async findOne(id: string, userId: string): Promise<ReportResponseDto> {
    const report = await this.reportsRepository.findById(id, userId);
    if (!report) {
      throw new NotFoundException('Report not found');
    }
    return this.toResponseDto(report);
  }

  async create(userId: string, dto: CreateReportDto): Promise<ReportResponseDto> {
    return this.uow.execute(async () => {
      const report = await this.reportsRepository.create(userId, dto);
      return this.toResponseDto(report);
    });
  }

  async update(id: string, userId: string, dto: UpdateReportDto): Promise<ReportResponseDto> {
    return this.uow.execute(async () => {
      const report = await this.reportsRepository.update(id, userId, dto);
      if (!report) {
        throw new NotFoundException('Report not found');
      }
      return this.toResponseDto(report);
    });
  }

  async remove(id: string, userId: string): Promise<void> {
    return this.uow.execute(async () => {
      const deleted = await this.reportsRepository.remove(id, userId);
      if (!deleted) {
        throw new NotFoundException('Report not found');
      }
    });
  }

  private toResponseDto(report: Report): ReportResponseDto {
    return {
      id: report.id,
      userId: report.userId,
      portfolioId: report.portfolioId,
      reportData: report.reportData,
      createdAt: report.createdAt,
      updatedAt: report.updatedAt,
    };
  }
}
