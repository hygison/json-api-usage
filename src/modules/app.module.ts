import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { JsonApiModule } from 'json-api-nestjs';
import { AuthController } from '@/auth/auth.controller';
import { AuthService } from '@/auth/auth.service';
import appConfig from '@/config/app.config';
import { AppController } from '@/controllers/app.controller';
import { UserController } from '@/controllers/user.controller';
import { User } from '@/database/entities/user.entity';
import { JwtGuard } from '@/guards/jwt.guard';
import { ErrorInterceptor } from '@/interceptors/error.interceptor';
import { DatabaseModule } from '@/modules/database.module';
import { AppService } from '@/services/app.service';
import { AllowAnyPipe } from '@/pipes/allow-any.pipe';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [appConfig] }),
    DatabaseModule,
    HttpModule,
    JsonApiModule.forRoot({
      entities: [User],
      controllers: [UserController],
      providers: [Logger],
      imports: [DatabaseModule],
      options: {
        debug: true,
        requiredSelectField: false,
        useSoftDelete: true,
        pipeForId: AllowAnyPipe,
      },
    }),
  ],
  controllers: [AppController, AuthController],
  providers: [
    { provide: APP_FILTER, useClass: ErrorInterceptor },
    { provide: APP_GUARD, useClass: JwtGuard },
    AppService,
    Logger,
    JwtService,
    AuthService,
  ],
})
export class AppModule {}
