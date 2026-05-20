import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User } from '@prisma/client';
import { UsersService } from '../users/services/users.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.findByEmail(email);
    // En un entorno real se usaría bcrypt.compare(pass, user.password)
    if (user && user.password === pass) {
      return user;
    }
    throw new UnauthorizedException('Credenciales inválidas');
  }

  login(user: User & { userRoles?: { role: { name: string } }[] }): { access_token: string } {
    const roles = user.userRoles?.map(ur => ur.role.name) || [];
    const payload: JwtPayload = { email: user.email, sub: user.id, roles };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
