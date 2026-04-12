import type { FindAllBooksResponseDto } from '../../dtos/book/findAllBooksResponseDto.js';

export interface FindAllBooksInterface {
  execute(): Promise<FindAllBooksResponseDto>;
}
