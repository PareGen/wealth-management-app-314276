import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreatePortfolioDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  name!: string;
}

export class UpdatePortfolioDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  name?: string | undefined;
}

export class PortfolioResponseDto {
  id!: string;
  userId!: string;
  name!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
