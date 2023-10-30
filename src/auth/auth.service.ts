import {
    BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthLoginDTO } from './dto/auth-login.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthRecoverDTO } from './dto/auth-recover.dto';
import { AuthResetDTO } from './dto/auth-reset.dto';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { AuthRegisterDTO } from './dto/auth-register.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  createToken(user: User) {
    return {accessToken: this.jwtService.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email
      },
      {
        subject: String(user.id),
        audience: 'users',
        expiresIn: '7 days'
      },
    )}
  }

  checkToken(token: string) {

    try {
        const data = this.jwtService.verify(token, {
                audience: 'users'
            })

            return data

    } catch(e) {
        throw new BadRequestException(e)
    }

  }

  isValidToken(token: string) {
    try {
      if (this.checkToken(token)) {
        return true
      }
    } catch (e) {
      return false
    }
  }

  async login(data: AuthLoginDTO) {
    const user = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
        password: data.password,
      },
    });
    if (!user) {
      throw new UnauthorizedException('Credenciais inválidas');
    }

    return this.createToken(user);
  }

  async recover(data: AuthRecoverDTO) {
    const email = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!email) {
      throw new NotFoundException('Endereço não encontrado');
    }

    // TODO: Send message with password reset instructions
    return true;
  }

  async reset(data: AuthResetDTO) {
    // TODO: Validate token then change password in database

    const id = 0; // Extract id from token

    const user = await this.prismaService.user.update({
      where: { id },
      data: { password: data.password },
    });

    return this.createToken(user);
  }

  async register(data: AuthRegisterDTO) {

    const user = await this.userService.create(data);

    return this.createToken(user);
  }
}
