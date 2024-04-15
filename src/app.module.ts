import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpRequestLoggerMiddleware } from './middleware/http-request-logger.middleware';
import { ArtistsModule } from './modules/artists/artists.module';
import { PlaylistsModule } from './modules/playlists/playlists.module';
import { SongsModule } from './modules/songs/songs.module';
import { UsersModule } from './modules/users/users.module';
import { LoggerService } from './services/logger.service';

@Module({
  imports: [
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
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpRequestLoggerMiddleware).forRoutes('*');
  }
}
