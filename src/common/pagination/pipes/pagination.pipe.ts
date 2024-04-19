import { PipeTransform, Injectable, ArgumentMetadata } from '@nestjs/common';
import { Pagination } from '../dto/pagination.dto';

@Injectable()
export class PaginationPipe implements PipeTransform {
  transform(value: any) {
    const pagination = new Pagination();
    pagination.page = +value.page || 1;
    pagination.pageSize = +value.pageSize || 10;
    pagination.search = value.search || '';
    pagination.sortBy = value.sortBy || '';
    pagination.sortOrder = value.sortOrder || '';
    return pagination;
  }
}