import { IsOptional, IsString, MinLength, IsBoolean, IsNumber, IsEnum, IsDate, IsUUID } from 'class-validator';

export class CreateNotificationDto {
  @IsUUID()
  userId!: string;

  @IsString()
  @MinLength(1)
  message!: string;

  @IsBoolean()
  isRead!: boolean;
}

export class UpdateNotificationDto {
  @IsOptional()
  @IsUUID()
  userId?: string | undefined;

  @IsOptional()
  @IsString()
  @MinLength(1)
  message?: string | undefined;

  @IsOptional()
  @IsBoolean()
  isRead?: boolean | undefined;
}

export class NotificationResponseDto {
  id!: string;
  userId!: string;
  message!: string;
  isRead!: boolean;
  createdAt!: Date;
  updatedAt!: Date;
}
