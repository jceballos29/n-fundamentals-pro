import { DataSource } from 'typeorm';
import { Song } from './entities/song.entity';

export const songsProvider = [
  {
    provide: 'SONGS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Song),
    inject: ['DATA_SOURCE'],
  },
];
