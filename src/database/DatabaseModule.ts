import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ConfigKey } from 'src/config/ConfigKey';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(ConfigKey.DATABASE_HOST, 'localhost'),
        port: configService.get<number>(ConfigKey.DATABASE_PORT, 5432),
        username: configService.getOrThrow(ConfigKey.DATABASE_USER),
        password: configService.getOrThrow(ConfigKey.DATABASE_PASSWORD),
        database: configService.getOrThrow(ConfigKey.DATABASE_NAME),
        migrationsTransactionMode: 'each',
        entities: [`${__dirname}/../../**/entity/*.{ts,js}`],
        migrations: ['dist/db/migrations/*.js'],
        synchronize: false,
        migrationsRun: true,
        logging: configService.get<boolean>('DATABASE_LOGGING', false),
      }),
    }),
  ],
})
export class DatabaseModule {}
