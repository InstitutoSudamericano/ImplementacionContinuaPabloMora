import { IsString } from 'class-validator';

export class CreateChatDto {
  @IsString()
  matchId: string;
}

export class CreateMessageDto {
  @IsString()
  senderId: string;

  @IsString()
  content: string;
}
