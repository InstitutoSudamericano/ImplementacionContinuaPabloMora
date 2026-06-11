import { InteractionType } from '@prisma/client-activity';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateInteractionDto {
  @IsString()
  fromUserId: string;

  @IsString()
  toUserId: string;

  @IsEnum(InteractionType)
  type: InteractionType;

  @IsOptional()
  @IsString()
  reason?: string;
}

export class InteractionActionDto {
  @IsString()
  fromUserId: string;

  @IsString()
  toUserId: string;

  @IsOptional()
  @IsString()
  reason?: string;
}
