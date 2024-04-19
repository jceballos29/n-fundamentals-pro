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
  BadRequestException,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { LoggerService } from 'src/services/logger.service';
import { Pagination } from '../../common/pagination/dto/pagination.dto';
import { SongsFilterDto } from './dto/songs-filter.dto';
import { PaginationPipe } from '../../common/pagination/pipes/pagination.pipe';
import { SongFiltersPipe } from './pipes/song-filters.pipe';

@Controller({
  path: 'songs',
  scope: Scope.DEFAULT,
})
export class SongsController {
  constructor(
    private readonly songsService: SongsService,
    private readonly logger: LoggerService,
  ) {}

  @Post('/')
  async create(@Body() createSongDto: CreateSongDto) {
    try {
      const song = await this.songsService.create(createSongDto);
      return song;
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'Error creating song',
        },
      );
    }
  }

  @Post('/bulk')
  async createBulk(@Body() createSongDto: CreateSongDto[]) {
    try {
      const songs = await this.songsService.createBulk(createSongDto);
      return songs;
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'Error creating songs',
        },
      );
    }
  }

  @Get('/')
  async findAll(
    @Query(new PaginationPipe()) pagination: Pagination,
    @Query(new SongFiltersPipe()) filters: SongsFilterDto,
  ) {
    try {
      const songs = await this.songsService.findAll(pagination, filters);
      return songs;
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'Error fetching songs',
        },
      );
    }
  }

  @Get('/:id')
  async findOne(
    @Param(
      'id'
    )
    id: string,
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
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'Error fetching song',
        },
      );
    }
  }

  @Patch('/:id')
  async update(
    @Param(
      'id',
    )
    id: string,
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
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'Error updating song',
        },
      );
    }
  }

  @Delete('/:id')
  async remove(
    @Param(
      'id',
    )
    id: string,
  ) {
    try {
      const song = await this.songsService.remove(id);
      if (!song) {
        this.logger.error('Song not found');
        return new HttpException('Song not found', HttpStatus.NOT_FOUND);
      }
    } catch (error) {
      this.logger.error(error.message);
      return new HttpException(
        error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
        {
          cause: 'Error deleting song',
        },
      );
    }
  }
}
