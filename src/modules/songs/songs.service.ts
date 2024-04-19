import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { PaginationResult } from '../../common/pagination/dto/pagination-result.dto';
import { Pagination } from '../../common/pagination/dto/pagination.dto';
import { SongsFilterDto } from './dto/songs-filter.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';

@Injectable()
export class SongsService {
  constructor(
    @Inject('SONGS_REPOSITORY')
    private readonly songsRepository: Repository<Song>,
  ) {}

  private readonly songs = [];

  async create(createSongDto: CreateSongDto): Promise<Song> {
    const song = new Song();
    song.title = createSongDto.title;
    song.artists = createSongDto.artists;
    song.album = createSongDto.album;
    song.genre = createSongDto.genre;
    song.releaseYear = createSongDto.releaseYear;
    song.duration = createSongDto.duration;

    return await this.songsRepository.save(song);
  }

  async createBulk(createSongDto: CreateSongDto[]): Promise<Song[]> {
    const songs = createSongDto.map((song) => {
      const newSong = new Song();
      newSong.title = song.title;
      newSong.artists = song.artists;
      newSong.album = song.album;
      newSong.genre = song.genre;
      newSong.releaseYear = song.releaseYear;
      newSong.duration = song.duration;
      return newSong;
    });

    return await this.songsRepository.save(songs);
  }

  async findAll(
    pagination: Pagination,
    filters: SongsFilterDto,
  ): Promise<PaginationResult<Song>> {
    const query = this.songsRepository.createQueryBuilder('song');

    // Filters
    if (filters.title) {
      query.andWhere('song.title ILIKE :title', {
        title: `%${filters.title}%`,
      });
    }

    if (filters.artists) {
      query.andWhere('song.artists @> :artists', { artists: filters.artists });
    }

    if (filters.album) {
      query.andWhere('song.album ILIKE :album', {
        album: `%${filters.album}%`,
      });
    }

    if (filters.genres) {
      query.andWhere('song.genre IN (:...genres)', { genres: filters.genres });
    }

    if (filters.releaseYear) {
      query.andWhere('song.releaseYear = :releaseYear', {
        releaseYear: filters.releaseYear,
      });
    }

    // Search
    if (pagination.search) {
      query.andWhere('song.title ILIKE :search', {
        search: `%${pagination.search}%`,
      });
    }

    // Order
    if (pagination.sortBy) {
      query.orderBy(`song.${pagination.sortBy}`, pagination.sortOrder);
    }

    // Pagination
    const total = await query.getCount();
    const data = await query
      .skip((pagination.page - 1) * pagination.pageSize)
      .take(pagination.pageSize)
      .getMany();

    return {
      data,
      total,
    };
  }

  async findOne(id: string) {
    return await this.songsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: string, updateSongDto: UpdateSongDto) {
    return await this.songsRepository.update(
      {
        id,
      },
      updateSongDto,
    );
  }

  async remove(id: string) {
    return await this.songsRepository.delete({
      id,
    });
  }
}
