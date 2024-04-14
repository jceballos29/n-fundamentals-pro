import { Injectable } from '@nestjs/common';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import { Song } from './entities/song.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SongsService {
  constructor(
    @InjectRepository(Song) private readonly songsRepository: Repository<Song>,
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

  findOne(id: number) {
    return this.songsRepository.findOne({
      where: {
        id,
      },
    });
  }

  update(id: number, updateSongDto: UpdateSongDto) {
    const song = this.songs.find((song) => song.id === id);
    this.songs[this.songs.indexOf(song)] = {
      ...song,
      updatedAt: new Date(),
      ...updateSongDto,
    };
    return song;
  }

  remove(id: number) {
    const song = this.songs.find((song) => song.id === id);
    this.songs.splice(this.songs.indexOf(song), 1);
    return song;
  }
}
