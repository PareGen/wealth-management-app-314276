import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateIntegrationDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  institutionName!: string;

  @IsString()
  @MinLength(1)
  apiKey!: string;
}

export class UpdateIntegrationDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  institutionName?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  apiKey?: string | undefined;
}

export class IntegrationResponseDto {
  id!: string;
  userId!: string;
  institutionName!: string;
  apiKey!: string;
  createdAt!: Date;
  updatedAt!: Date;
}
