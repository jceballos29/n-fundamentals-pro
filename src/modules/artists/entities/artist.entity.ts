import { Song } from 'src/modules/songs/entities/song.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany } from 'typeorm';

@Entity()
export class Artist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  // @ManyToMany(() => Song, (song) => song.artists)
  // songs: Song[];
}
