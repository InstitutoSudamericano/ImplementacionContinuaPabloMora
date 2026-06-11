import { LiveSessionState } from '@prisma/client-activity';
import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';

export class UpsertLiveStatusDto {
  @IsString()
  userId: string;

  @IsBoolean()
  isOnline: boolean;

  @IsBoolean()
  isLiveEnabled: boolean;

  @IsOptional()
  @IsString()
  currentLiveTitle?: string;
}

export class CreateLiveSessionDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(LiveSessionState)
  status?: LiveSessionState;
}

export class UpdateLiveSessionDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(LiveSessionState)
  status?: LiveSessionState;
}
