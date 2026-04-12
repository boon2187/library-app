import type { BookRepositoryInterface } from '../../../domain/repositories/bookRepositoryInterface.js';
import type { FindAllBooksResponseDto } from '../../dtos/book/findAllBooksResponseDto.js';
import type { FindAllBooksInterface } from './findAllBooksUseCaseInterface.js';

export class FindAllBooksUseCase implements FindAllBooksInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async execute(): Promise<FindAllBooksResponseDto> {
    const books = await this.bookRepository.findAll();

    return {
      books: books.map((book) => ({
        id: book.id,
        title: book.title,
        isAvailable: book.isAvailable,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
      })),
    };
  }
}
