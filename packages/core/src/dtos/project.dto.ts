import { IsOptional, IsString, MinLength } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  @MinLength(1)
  name!: string;

  @IsString()
  @IsOptional()
  description?: string | undefined;
}

export class UpdateProjectDto {
  @IsString()
  @MinLength(1)
  @IsOptional()
  name?: string | undefined;

  @IsString()
  @IsOptional()
  description?: string | undefined;
}

export class ProjectResponseDto {
  id!: string;
  name!: string;
  description!: string;
  userId!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
