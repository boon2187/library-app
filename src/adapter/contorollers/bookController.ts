import type { Request, Response } from 'express';
import type { AddBookUseCase } from '../../application/usecases/book/addBookUseCase.js';
import type { AddBookRequestDto } from '../../application/dtos/book/addBookRequestDto.js';
import type { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase.js';
import type { FindBookByIdRequestDto } from '../../application/dtos/book/findBookByIdRequestDto.js';

export class BookController {
  constructor(
    private readonly addBookUseCase: AddBookUseCase,
    private readonly findBookByIdUseCase: FindBookByIdUseCase,
  ) {}

  async add(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: AddBookRequestDto = {
        title: req.body.title,
      };
      const title = req.body.title as string;
      const book = await this.addBookUseCase.execute(requestDto);
      res.status(201).json(book);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '書籍の登録に失敗しました' });
    }
  }

  async findById(req: Request, res: Response): Promise<void> {
    try {
      const requestDto: FindBookByIdRequestDto = {
        id: req.params.id as string,
      };
      const book = await this.findBookByIdUseCase.execute(requestDto);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: '書籍が見つかりませんでした' });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: '書籍の検索に失敗しました' });
    }
  }
}
