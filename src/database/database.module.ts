import { DynamicModule, Module } from '@nestjs/common';
import { databaseProvider } from './database.provider.';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Song } from 'src/modules/songs/entities/song.entity';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [...databaseProvider],
  exports: [...databaseProvider],
})
export class DatabaseModule {
  static forRoot(): DynamicModule {
    return {
      module: DatabaseModule,
      providers: [
        {
          provide: 'DATA_SOURCE',
          useFactory: async (configService: ConfigService) => {
            const databaseConfig = configService.get('database');
            const dataSource = new DataSource({
              type: 'postgres',
              host: databaseConfig.host,
              port: parseInt(databaseConfig.port),
              username: databaseConfig.username,
              password: databaseConfig.password,
              database: databaseConfig.database,
              entities: [Song],
              synchronize: true,
            });

            return dataSource.initialize();
          },
          inject: [ConfigService],
        },
      ],
      exports: ['DATA_SOURCE'],
    };
  }
}
