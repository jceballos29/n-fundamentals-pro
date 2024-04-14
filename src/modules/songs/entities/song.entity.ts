import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Playlist } from 'src/modules/playlists/entities/playlist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text', { array: true })
  artists: string[];

  @Column('text')
  album: string;

  @Column('date')
  releaseDate: Date;

  @Column('time')
  duration: Date;

  @Column('text')
  lyrics: string;

  // @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  // @JoinTable({ name: 'songs_artists' })
  // artists: Artist[];

  // /**
  //  * Many songs can belong to playlist for each unique user
  //  */
  // @ManyToOne(() => Playlist, (playList) => playList.songs)
  // playlist: Playlist;
}
