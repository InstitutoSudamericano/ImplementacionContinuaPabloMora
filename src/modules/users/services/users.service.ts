import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { SubscriptionRepository } from '../../subscriptions/repositories/subscription.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly repository: UserRepository,
    private readonly subscriptionRepository: SubscriptionRepository,
  ) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.repository.findByEmail(dto.email);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }

    if (dto.suscripcionId) {
      const subscription = await this.subscriptionRepository.findById(
        dto.suscripcionId,
      );
      if (!subscription) {
        throw new NotFoundException('La suscripcion indicada no existe.');
      }
    }

    return this.repository.create(dto);
  }

  findAll() {
    return this.repository.findAll();
  }

  async findOne(id: string) {
    const user = await this.repository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.repository.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async update(id: string, dto: UpdateUserDto) {
    await this.findOne(id);

    if (dto.suscripcionId) {
      const subscription = await this.subscriptionRepository.findById(
        dto.suscripcionId,
      );
      if (!subscription) {
        throw new NotFoundException('La suscripcion indicada no existe.');
      }
    }

    return this.repository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.repository.delete(id);
  }
}
