import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '@/config/typeorm.config';
import { UserPrivate } from '@/database/entities/user-private.entity';
import { User } from '@/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([User, UserPrivate])],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
