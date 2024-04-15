import { Inject, Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

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
    song.releaseDate = createSongDto.releaseDate;
    song.duration = createSongDto.duration;
    song.lyrics = createSongDto.lyrics;

    return await this.songsRepository.save(song);
  }

  async findAll(): Promise<Song[]> {
    return await this.songsRepository.find();
  }

  async findOne(id: number) {
    return await this.songsRepository.findOne({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateSongDto: UpdateSongDto) {
    return await this.songsRepository.update(
      {
        id,
      },
      updateSongDto,
    );
  }

  async remove(id: number) {
    return await this.songsRepository.delete({
      id,
    });
  }
}
