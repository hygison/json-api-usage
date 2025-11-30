import { randomUUID } from 'crypto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as argon2 from 'argon2';
import { Repository } from 'typeorm';
import { JWT_SIGN_IN_OPTIONS } from '@/constants/jwt.constant';
import { UserPrivate } from '@/database/entities/user-private.entity';
import { User } from '@/database/entities/user.entity';
import { SignInDto, SignUpDto } from '@/dtos/auth.dto';
import { ActiveUserInterface } from '@/types/active-user';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserPrivate)
    private readonly userPrivateRepository: Repository<UserPrivate>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async register(signUpDto: SignUpDto): Promise<void> {
    const { email, password } = signUpDto;

    try {
      const user = await this.userRepository.save(this.userRepository.create({}));

      await this.userPrivateRepository.save(
        new UserPrivate({
          email: email,
          password: password,
          userId: user.id,
        }),
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user = await this.userPrivateRepository.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        email: true,
        password: true,
        userId: true,
      },
    });
    if (!user) {
      throw new BadRequestException('Invalid email');
    }

    const isPasswordMatch = await argon2.verify(user.password, password);
    if (!isPasswordMatch) {
      throw new BadRequestException('Invalid password');
    }

    return await this.generateAccessToken(user);
  }

  async refreshToken(activeUser: ActiveUserInterface): Promise<{ accessToken: string }> {
    const userPrivate = await this.userPrivateRepository.findOne({ where: { userId: activeUser.userId } });
    return this.generateAccessToken(userPrivate);
  }

  async generateAccessToken(userPrivate: Partial<UserPrivate>): Promise<{ accessToken: string }> {
    try {
      const tokenId = randomUUID();
      const accessToken = await this.jwtService.signAsync(
        {
          userId: userPrivate.userId,
          email: userPrivate.email,
          tokenId: tokenId,
        } as ActiveUserInterface,
        JWT_SIGN_IN_OPTIONS,
      );
      return { accessToken: accessToken };
    } catch (e) {
      throw new BadRequestException(e);
    }
  }
}
