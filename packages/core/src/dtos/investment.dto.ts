import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateInvestmentDto {
  @IsUUID()
  portfolioId!: string;

  @IsString()
  @MinLength(1)
  name!: string;

  @IsNumber()
  amount!: number;

  @IsDate()
  investmentDate!: Date;
}

export class UpdateInvestmentDto {
  @IsOptional()
  @IsUUID()
  portfolioId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;

  @IsOptional()
  @IsNumber()
  amount?: number | undefined;

  @IsOptional()
  @IsDate()
  investmentDate?: Date | undefined;
}

export class InvestmentResponseDto {
  id!: string;
  portfolioId!: string;
  name!: string;
  amount!: number;
  investmentDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
