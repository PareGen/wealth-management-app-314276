import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateGoalDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  description!: string;

  @IsNumber()
  targetAmount!: number;

  @IsDate()
  dueDate!: Date;
}

export class UpdateGoalDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  description?: string | undefined;

  @IsOptional()
  @IsNumber()
  targetAmount?: number | undefined;

  @IsOptional()
  @IsDate()
  dueDate?: Date | undefined;
}

export class GoalResponseDto {
  id!: string;
  userId!: string;
  description!: string;
  targetAmount!: number;
  dueDate!: Date;
  createdAt!: Date;
  updatedAt!: Date;
}
