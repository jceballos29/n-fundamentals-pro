import { IsArray, IsMilitaryTime, IsNumber, IsOptional, IsString } from "class-validator";

export class SongsFilterDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  artists: string[];

  @IsOptional()
  @IsString()
  album: string;

  @IsOptional()
  @IsString()
  genres: string[];

  @IsOptional()
  @IsString()
  releaseYear: string;
}