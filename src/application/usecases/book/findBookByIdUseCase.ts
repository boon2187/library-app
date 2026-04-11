import type { BookRepositoryInterface } from '../../../domain/repositories/bookRepositoryInterface.js';
import type { FindBookByIdRequestDto } from '../../dtos/book/findBookByIdRequestDto.js';
import type { FindBookByIdResponseDto } from '../../dtos/book/findBookByIdResponseDto.js';
import type { FindBookByIdInterface } from './findBookByIdUseCaseInterface.js';

export class FindBookByIdUseCase implements FindBookByIdInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async execute(
    request: FindBookByIdRequestDto,
  ): Promise<FindBookByIdResponseDto> {
    const book = await this.bookRepository.findById(request.id);
    if (!book) {
      throw new Error('Book not found');
    }

    return {
      id: book.id,
      title: book.title,
      isAvailable: book.isAvailable,
      createdAt: book.createdAt,
      updatedAt: book.updatedAt,
    };
  }
}
