import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaUsersService } from '../../../prisma/prisma-users.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaUsersService) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByEmailSilent(dto.email);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }

    if (dto.suscripcionId) {
      const subscription = await this.prisma.subscription.findUnique({
        where: { id: dto.suscripcionId },
      });
      if (!subscription) {
        throw new NotFoundException('La suscripcion indicada no existe.');
      }
    }

    return this.prisma.user.create({
      data: dto,
      include: { subscription: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { subscription: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        userRoles: { include: { role: true } },
      },
    });
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async findByEmailSilent(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { role: true } } },
    });
  }

  async findByEmail(email: string) {
    const user = await this.findByEmailSilent(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    if (dto.suscripcionId) {
      const subscription = await this.prisma.subscription.findUnique({
        where: { id: dto.suscripcionId },
      });
      if (!subscription) {
        throw new NotFoundException('La suscripcion indicada no existe.');
      }
    }

    return this.prisma.user.update({
      where: { id },
      data: dto,
      include: { subscription: true },
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.user.delete({ where: { id } });
  }

  async getStatsSummary() {
    const [subscriptions, topUsers] = await Promise.all([
      this.prisma.$queryRaw`
        SELECT 
          s."name" AS "subscriptionType", 
          COUNT(u."id")::INT AS "userCount",
          (s."price" * COUNT(u."id"))::FLOAT AS "estimatedRevenue"
        FROM "Subscription" s
        LEFT JOIN "User" u ON u."suscripcionId" = s."id"
        GROUP BY s."id", s."name", s."price"
        ORDER BY "userCount" DESC;
      `,
      this.prisma.user.findMany({ take: 5 }).then(users => users.map(u => ({
        id: u.id,
        nombre: u.nombre,
        email: u.email,
        matchCount: 0
      }))),
    ]);
    return {
      subscriptions,
      topUsers,
    };
  }
}
