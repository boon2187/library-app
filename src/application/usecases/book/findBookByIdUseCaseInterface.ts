import type { FindBookByIdRequestDto } from '../../dtos/book/findBookByIdRequestDto.js';
import type { FindBookByIdResponseDto } from '../../dtos/book/findBookByIdResponseDto.js';

export interface FindBookByIdInterface {
  execute(request: FindBookByIdRequestDto): Promise<FindBookByIdResponseDto>;
}
