import { Playlist } from 'src/modules/playlists/entities/playlist.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  name: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;

  /**
   * A user can create many playLists
   */
  // @OneToMany(() => Playlist, (playList) => playList.user)
  // playlists: Playlist[];
}
