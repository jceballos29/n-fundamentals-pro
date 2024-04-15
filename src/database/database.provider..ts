import { Song } from "src/modules/songs/entities/song.entity";
import { DataSource } from "typeorm";

export const databaseProvider = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async () => {
      const dataSource = new DataSource({
        type: 'postgres',
        database: 'fundamentals',
        host: 'localhost',
        username: 'fundamentals',
        password: 'fundamentals-password',
        port: 5432,
        entities: [Song],
        synchronize: true,
      });

      return dataSource.initialize();
    }
  }
]