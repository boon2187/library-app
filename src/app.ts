console.log('DATABASE_URL:', process.env.DATABASE_URL);
import 'dotenv/config';
import express from 'express';
import { BookController } from './presentation/bookController.js';
import { PrismaBookRepository } from './adapter/repositories/prismaBookRepository.js';
import { BookService } from './buisinessLogic/bookService.js';

const app = express();

app.use(express.json());

const bookRepository = new PrismaBookRepository();
const bookService = new BookService(bookRepository);
const bookController = new BookController(bookService);

const PORT = process.env.PORT || 3000;

app.post('/books', bookController.add.bind(bookController));
app.get('/books/:id', bookController.findById.bind(bookController));

app.get('/', (req, res) => {
  res.json({ message: 'Hello, World!' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
