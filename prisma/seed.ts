import { PrismaClient, SubscriptionType } from '@prisma/client-users';

const prisma = new PrismaClient();

async function main() {
  const subscriptions = [
    {
      name: SubscriptionType.FREE,
      benefits: ['Registro basico', 'Explorar perfiles'],
      restrictions: ['Sin likes ilimitados', 'Sin boosts'],
      price: 0,
    },
    {
      name: SubscriptionType.GOLD,
      benefits: ['Mas likes', 'Ver quien te dio like'],
      restrictions: ['Sin live prioritario'],
      price: 9.99,
    },
    {
      name: SubscriptionType.PREMIUM,
      benefits: ['Likes ilimitados', 'Mensajes prioritarios'],
      restrictions: ['Sin soporte VIP'],
      price: 14.99,
    },
    {
      name: SubscriptionType.PLATINO,
      benefits: ['Boost semanal', 'Live destacado', 'Prioridad de match'],
      restrictions: ['Sin restriccion relevante en MVP'],
      price: 19.99,
    },
    {
      name: SubscriptionType.BRONCE,
      benefits: ['Plan economico', 'Acceso a musica favorita'],
      restrictions: ['Menos visibilidad', 'Sin boost'],
      price: 4.99,
    },
  ];

  for (const subscription of subscriptions) {
    await prisma.subscription.upsert({
      where: { name: subscription.name },
      update: subscription,
      create: subscription,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
