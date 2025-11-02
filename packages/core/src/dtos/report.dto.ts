import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateReportDto {
  @IsUUID()
  userId!: string;

  @IsUUID()
  portfolioId!: string;

  reportData!: Record<string, unknown>;
}

export class UpdateReportDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsUUID()
  portfolioId?: string | undefined;

  @IsOptional()
  reportData?: Record<string, unknown> | undefined;
}

export class ReportResponseDto {
  id!: string;
  userId!: string;
  portfolioId!: string;
  reportData!: Record<string, unknown>;
  createdAt!: Date;
  updatedAt!: Date;
}
