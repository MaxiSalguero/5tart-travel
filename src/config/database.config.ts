import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource, DataSourceOptions, Tree } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USERNAME } from './envs';

const dbConfig: DataSourceOptions = {
  type: 'postgres',
  database: DB_NAME,
  host: DB_HOST,
  port: +DB_PORT, 
  username: DB_USERNAME,
  password: DB_PASSWORD,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  logging: true,
  synchronize: false,
  dropSchema: false,
};

export const databaseConfig = TypeOrmModule.forRoot({
  ...dbConfig,
});

export const connectionSource = new DataSource(dbConfig);