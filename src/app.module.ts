import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpRequestLoggerMiddleware } from './middleware/http-request-logger.middleware';
import { ArtistsModule } from './modules/artists/artists.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { SongsModule } from './modules/songs/songs.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerService } from './services/logger.service';
import { DataSource } from 'typeorm';
import { Song } from './modules/songs/entities/song.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      database: 'fundamentals',
      host: 'localhost',
      username: 'fundamentals',
      password: 'fundamentals-password',
      port: 5432,
      entities: [Song],
      synchronize: true,
    }),
    SongsModule,
    ArtistsModule,
    UsersModule,
    PlaylistsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ...(process.env.NODE_ENV !== 'production' ? [LoggerService] : []),
  ],
})
export class AppModule implements NestModule {
  constructor(dataSource: DataSource) {
    console.log('dbName ', dataSource.driver.database);
  }

  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLoggerMiddleware).forRoutes('*');
  }
}
