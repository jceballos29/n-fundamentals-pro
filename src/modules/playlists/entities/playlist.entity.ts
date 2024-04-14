import { Song } from 'src/modules/songs/entities/song.entity';
import { User } from 'src/modules/users/entities/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne,  } from 'typeorm';

export class Playlist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  /**
   * Each Playlist will have multiple songs
   */
  // @OneToMany(() => Song, (song) => song.playlist)
  // songs: Song[];

  /**
   * Many Playlist can belong to a single unique user
   */

  // @ManyToOne(() => User, (user) => user.playlists)
  // user: User;
}
