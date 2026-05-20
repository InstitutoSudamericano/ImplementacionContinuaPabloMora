import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getStatus() {
    return {
      name: 'Tindpablo API',
      version: '1.0.0',
      description: 'Backend MVP estilo Tinder con NestJS, Prisma y PostgreSQL.',
      modules: [
        'users',
        'subscriptions',
        'interactions',
        'matches',
        'chats',
        'music',
        'live',
      ],
    };
  }
}
