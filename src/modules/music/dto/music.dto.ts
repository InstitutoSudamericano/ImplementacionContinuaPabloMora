import { IsOptional, IsString } from 'class-validator';

export class CreateMusicItemDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  artist: string;

  @IsOptional()
  @IsString()
  spotifyUrl?: string;

  @IsOptional()
  @IsString()
  source?: string;
}

export class UpdateMusicItemDto {
  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  artist?: string;

  @IsOptional()
  @IsString()
  spotifyUrl?: string;

  @IsOptional()
  @IsString()
  source?: string;
}
