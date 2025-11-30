import { Controller, Post, Get, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiBadRequestResponse, ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthService } from '@/auth/auth.service';
import { ActiveUser } from '@/decorators/active-user.decorator';
import { Public } from '@/decorators/public.decorator';
import { SignUpDto, SignInDto } from '@/dtos/auth.dto';
import { ActiveUserInterface } from '@/types/active-user';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiCreatedResponse({
    description: 'User has been successfully signed up',
  })
  @Public()
  @Post('sign-up')
  register(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.register(signUpDto);
  }

  @ApiBadRequestResponse({
    description: 'Return errors for invalid sign in fields',
  })
  @ApiOkResponse({ description: 'User has been successfully signed in' })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  login(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    return this.authService.login(signInDto);
  }

  @ApiBearerAuth()
  @Get('refresh-token')
  refreshToken(@ActiveUser() user: ActiveUserInterface): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(user);
  }
}
