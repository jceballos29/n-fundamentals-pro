import { Artist } from 'src/modules/artists/entities/artist.entity';
import { Playlist } from 'src/modules/playlists/entities/playlist.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  ManyToOne,
  Generated,
} from 'typeorm';

@Entity()
export class Song {
  @PrimaryGeneratedColumn('uuid') // Use 'uuid' generation strategy
  @Generated('uuid') // Add this decorator for proper UUID generation
  id: string; // Change type to string

  @Column('text')
  title: string;

  @Column('text', { array: true })
  artists: string[];

  @Column('text')
  album: string;

  @Column('text')
  genre: string;

  @Column('int')
  releaseYear: number;

  @Column('time')
  duration: Date;

  // @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
  // @JoinTable({ name: 'songs_artists' })
  // artists: Artist[];

  // /**
  //  * Many songs can belong to playlist for each unique user
  //  */
  // @ManyToOne(() => Playlist, (playList) => playList.songs)
  // playlist: Playlist;
}
