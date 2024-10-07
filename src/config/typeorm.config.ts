import { join } from 'path';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { DataSource } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const port = Number(process.env.DB_PORT);
const isDevelopment = true;
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: port,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../database/entities/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '../database/migrations/*{.ts,.js}')],
  synchronize: true,
  logging: true,
  logger: 'file',
  maxQueryExecutionTime: 1000,
  retryAttempts: 10,
  retryDelay: 3000,
  ...(isDevelopment
    ? {}
    : {
        ssl: {
          rejectUnauthorized: false,
        },
      }),
};

export const AppDataSource = new DataSource(<PostgresConnectionOptions>typeOrmConfig);
