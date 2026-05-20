import { Type } from 'class-transformer';
import {
  IsArray,
  IsEmail,
  IsInt,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  nombre: string;

  @Type(() => Number)
  @IsInt()
  @Min(18)
  edad: number;

  @IsOptional()
  @IsString()
  biografia?: string;

  @IsOptional()
  @Type(() => Number)
  peso?: number;

  @IsOptional()
  @Type(() => Number)
  altura?: number;

  @IsOptional()
  @IsString()
  nacionalidad?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsArray()
  @IsString({ each: true })
  fotos: string[];

  @IsOptional()
  @IsString()
  suscripcionId?: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  nombre?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(18)
  edad?: number;

  @IsOptional()
  @IsString()
  biografia?: string;

  @IsOptional()
  @Type(() => Number)
  peso?: number;

  @IsOptional()
  @Type(() => Number)
  altura?: number;

  @IsOptional()
  @IsString()
  nacionalidad?: string;

  @IsOptional()
  @IsString()
  genero?: string;

  @IsOptional()
  @IsString()
  ciudad?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  fotos?: string[];

  @IsOptional()
  @IsString()
  suscripcionId?: string;
}
