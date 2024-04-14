import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSongDto {
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  readonly artists: string[];

  @IsNotEmpty()
  @IsString()
  readonly album: string;

  @IsNotEmpty()
  @IsDateString()
  readonly releaseDate: Date;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;

  @IsString()
  @IsOptional()
  readonly lyrics: string;
}
