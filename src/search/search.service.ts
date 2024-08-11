import { Injectable } from '@nestjs/common';
import { SearchRepository } from './search.repository';

@Injectable()
export class SearchService {
  constructor(private searchRepository: SearchRepository) {}

  searchLupa(query: string) {
    return this.searchRepository.searchLupa(query);
  }
}
