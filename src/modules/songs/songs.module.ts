import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { LoggerService } from 'src/services/logger.service';
import { SongsController } from './songs.controller';
import { songsProvider } from './songs.provider';
import { SongsService } from './songs.service';

@Module({
  imports: [DatabaseModule],
  controllers: [SongsController],
  providers: [...songsProvider, SongsService, LoggerService],
})
export class SongsModule {}
