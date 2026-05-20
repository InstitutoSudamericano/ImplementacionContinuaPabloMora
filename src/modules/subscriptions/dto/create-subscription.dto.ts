import { SubscriptionType } from '@prisma/client';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubscriptionDto {
  @IsEnum(SubscriptionType)
  name: SubscriptionType;

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  benefits: string[];

  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  restrictions: string[];

  @Type(() => Number)
  @IsNumber()
  price: number;
}

export class UpdateSubscriptionDto {
  @IsOptional()
  @IsEnum(SubscriptionType)
  name?: SubscriptionType;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  benefits?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  restrictions?: string[];

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  price?: number;
}
