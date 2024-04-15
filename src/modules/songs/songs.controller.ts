import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  HttpException,
  ParseIntPipe,
  Scope,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { LoggerService } from 'src/services/logger.service';

@Controller({
  path: 'songs',
  scope: Scope.DEFAULT,
})
export class SongsController {
  constructor(private readonly songsService: SongsService, private readonly logger: LoggerService) {}

  @Post('/')
  async create(@Body() createSongDto: CreateSongDto) {
    try {
      const song = await this.songsService.create(createSongDto);
      return song;
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: 'Error creating song',
      });
    }
  }

  @Get('/')
  async findAll() {
    try {
      const songs = await this.songsService.findAll();
      return songs;
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: 'Error fetching songs',
      });
    }
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    try {
      const song = await this.songsService.findOne(id);
      if (!song) {
        this.logger.error('Song not found');
        return new HttpException('Song not found', HttpStatus.NOT_FOUND);
      }
      return song;
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: 'Error fetching song',
      });
    }
  }

  @Patch('/:id')
  async update(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
    @Body() updateSongDto: UpdateSongDto,
  ) {
    try {
      const song = await this.songsService.update(id, updateSongDto);
      console.log(song);
      if (!song) {
        this.logger.error('Song not found');
        return new HttpException('Song not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: 'Error updating song',
      });
    }
  }

  @Delete('/:id')
  async remove(
    @Param(
      'id',
      new ParseIntPipe({
        errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
      }),
    )
    id: number,
  ) {
    try {
      const song = await this.songsService.remove(id);
      if (!song) {
        this.logger.error('Song not found');
        return new HttpException('Song not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR, {
        cause: 'Error deleting song',
      });
    }
  }
}
