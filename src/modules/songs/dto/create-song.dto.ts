import {
  IsArray,
  IsDateString,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
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
  @IsString()
  readonly genre: string;

  @IsNotEmpty()
  @IsNumber()
  readonly releaseYear: number;

  @IsNotEmpty()
  @IsMilitaryTime()
  readonly duration: Date;
}
