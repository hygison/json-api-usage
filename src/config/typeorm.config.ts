import 'dotenv/config';
import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../database/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  synchronize: true,
  logging: true,
  logger: 'file',
  maxQueryExecutionTime: 1500,
  retryAttempts: 10,
  retryDelay: 5000,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDataSource = new DataSource(<PostgresConnectionOptions>typeOrmConfig);
