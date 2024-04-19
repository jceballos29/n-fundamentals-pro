import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class SongFiltersPipe implements PipeTransform {
  transform(value: any) {
    if (value.artists) {
      value.artists = value.artists.split(',');
    }

    if (value.genres) {
      value.genres = value.genres.split(',');
    }

    if (value.releaseYear) {
      value.releaseYear = parseInt(value.releaseYear, 10);
    }
    return value;
  }
}