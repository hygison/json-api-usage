import { HttpModule } from '@nestjs/axios';
import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JsonApiModule } from 'json-api-nestjs';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import appConfig from '@/config/app.config';
import { UserController } from '@/controllers/user.controller';
import { WalletController } from '@/controllers/wallet.controller';
import { Simple } from '@/database/entities/simple.entity';
import { User } from '@/database/entities/user.entity';
import { Wallet } from '@/database/entities/wallet.entity';
import { DatabaseModule } from '@/database.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    HttpModule,
    JsonApiModule.forRoot({
      entities: [User, Wallet, Simple],
      controllers: [UserController, WalletController],
      providers: [Logger],
      imports: [DatabaseModule],
      options: {
        debug: true,
        requiredSelectField: false,
        operationUrl: 'operation',
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
