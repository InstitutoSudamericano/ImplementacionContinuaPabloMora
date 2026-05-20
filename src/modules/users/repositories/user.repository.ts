import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  create(data: CreateUserDto) {
    return this.prisma.user.create({
      data,
      include: { subscription: true, liveStatus: true, musicItems: true },
    });
  }

  findAll() {
    return this.prisma.user.findMany({
      include: { subscription: true, liveStatus: true, musicItems: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      include: {
        subscription: true,
        liveStatus: true,
        musicItems: true,
        userRoles: { include: { role: true } },
      },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      include: { userRoles: { include: { role: true } } },
    });
  }

  update(id: string, data: UpdateUserDto) {
    return this.prisma.user.update({
      where: { id },
      data,
      include: { subscription: true, liveStatus: true, musicItems: true },
    });
  }

  delete(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
}
