import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors();

  // Swagger UI
  const config = new DocumentBuilder()
    .setTitle('TindPablo API')
    .setDescription(
      '📱 API REST de TindPablo — App de citas con matches, chats, live y música.\n\n' +
      '**Flujo básico:** Suscripciones → Usuarios → Like mutuo → Match → Chat → Mensajes',
    )
    .setVersion('1.0')
    .addTag('subscriptions', '💳 Planes de suscripcion (FREE, GOLD, PREMIUM, PLATINO, BRONCE)')
    .addTag('users', '👤 Registro y gestion de usuarios')
    .addTag('interactions', '❤️ Likes, dislikes, avoid y reportes entre usuarios')
    .addTag('matches', '🎉 Matches generados por likes mutuos')
    .addTag('chats', '💬 Chats y mensajes entre usuarios con match')
    .addTag('music', '🎵 Canciones favoritas de los usuarios')
    .addTag('live', '📡 Estado en vivo y sesiones live')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
      defaultModelsExpandDepth: 2,
      defaultModelExpandDepth: 2,
      docExpansion: 'list',
      filter: true,
      showRequestDuration: true,
    },
    customSiteTitle: 'TindPablo API Docs',
    customCss: `
      .swagger-ui .topbar { background: linear-gradient(135deg, #e91e63, #ff5722); }
      .swagger-ui .topbar-wrapper img { content: url('https://img.icons8.com/color/48/hearts.png'); height: 40px; }
      .swagger-ui .info .title { color: #e91e63; }
    `,
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`\n🚀 TindPablo API corriendo en: http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📖 Swagger UI disponible en:   http://localhost:${process.env.PORT ?? 3000}/api\n`);
}
bootstrap();
