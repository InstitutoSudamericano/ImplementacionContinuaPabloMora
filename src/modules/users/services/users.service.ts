import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from '../repositories/users.repository';
import { CreateUserDto, UpdateUserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(dto: CreateUserDto) {
    const existingUser = await this.findByEmailSilent(dto.email);
    if (existingUser) {
      throw new ConflictException('Ya existe un usuario con ese email.');
    }

    if (dto.suscripcionId) {
      const subscription = await this.userRepository.findSubscriptionById(dto.suscripcionId);
      if (!subscription) {
        throw new NotFoundException('La suscripcion indicada no existe.');
      }
    }

    return this.userRepository.create(dto);
  }

  findAll() {
    return this.userRepository.findAll();
  }

  async findOne(id: string) {
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado.');
    }
    return user;
  }

  async findByEmailSilent(email: string) {
    return this.userRepository.findByEmailSilent(email);
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
      const subscription = await this.userRepository.findSubscriptionById(dto.suscripcionId);
      if (!subscription) {
        throw new NotFoundException('La suscripcion indicada no existe.');
      }
    }

    return this.userRepository.update(id, dto);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.userRepository.remove(id);
  }

  async getStatsSummary() {
    return this.userRepository.getStatsSummary();
  }
}
