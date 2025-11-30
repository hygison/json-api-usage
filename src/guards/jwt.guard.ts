import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { JWT_VERIFY_OPTIONS } from '@/constants/jwt.constant';
import { IS_PUBLIC_KEY, REQUEST_USER_KEY } from '@/constants/meta.constant';
import { UserPrivate } from '@/database/entities/user-private.entity';
import { ActiveUserInterface } from '@/types/active-user';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private reflector: Reflector,
    @InjectRepository(UserPrivate)
    private readonly userPrivateRepository: Repository<UserPrivate>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    return true;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException('Authorization token is required');
    }

    try {
      const payload = await this.jwtService.verifyAsync<ActiveUserInterface>(token, JWT_VERIFY_OPTIONS);
      const isValidToken = await this.userPrivateRepository.findOne({
        where: { userId: payload.userId, email: payload.email },
      });
      if (!isValidToken) {
        throw new UnauthorizedException('Authorization token is not valid');
      }

      request[REQUEST_USER_KEY] = payload;
    } catch (e) {
      throw new UnauthorizedException(e);
    }

    return true;
  }

  private getToken(request: Request) {
    const [_, token] = request.headers.authorization?.split(' ') ?? [];
    return token;
  }
}
