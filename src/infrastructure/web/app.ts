console.log('DATABASE_URL:', process.env.DATABASE_URL);
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import express from 'express';
import { UuidGenerator } from '../../adapter/utils/uuidGenerator.js';
import { PrismaBookRepository } from '../../adapter/repositories/prismaBookRepository.js';
import { AddBookUseCase } from '../../application/usecases/book/addBookUseCase.js';
import { BookController } from '../../adapter/contorollers/bookController.js';
import { bookRoutes } from './routers/bookRouter.js';
import { FindBookByIdUseCase } from '../../application/usecases/book/findBookByIdUseCase.js';

const app = express();

app.use(express.json());

const prisma = new PrismaClient();
const uuidGenerator = new UuidGenerator();

const bookRepository = new PrismaBookRepository(prisma);
const addBookUseCase = new AddBookUseCase(bookRepository, uuidGenerator);
const findBookByIdUseCase = new FindBookByIdUseCase(bookRepository);

const bookController = new BookController(addBookUseCase, findBookByIdUseCase);

app.use('/books', bookRoutes(bookController));

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
