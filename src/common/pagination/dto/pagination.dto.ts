import { IsNumberString, IsOptional } from 'class-validator';

export class Pagination {
  @IsNumberString()
  page: number;

  @IsNumberString()
  pageSize: number;

  @IsOptional()
  search?: string;

  @IsOptional()
  sortBy?: string;

  @IsOptional()
  sortOrder?: 'ASC' | 'DESC';
}
