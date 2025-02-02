import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JsonApiModule } from 'json-api-nestjs';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';
import appConfig from '@/config/app.config';
import { UserController } from '@/controllers/user.controller';
import { Trip } from '@/database/entities/trip.entity';
import { User } from '@/database/entities/user.entity';
import { Wallet } from '@/database/entities/wallet.entity';
import { DatabaseModule } from '@/modules/database.module';
import { APP_FILTER } from '@nestjs/core';
import { ErrorInterceptor } from '@/interceptors/error.interceptor';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    HttpModule,
    JsonApiModule.forRoot({
      entities: [User, Wallet, Trip],
      controllers: [UserController],
      providers: [Logger],
      imports: [DatabaseModule],
      options: {
        debug: true,
        requiredSelectField: false,
        useSoftDelete: true,
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: ErrorInterceptor,
    },
    AppService,
    Logger,
  ],
})
export class AppModule {}
