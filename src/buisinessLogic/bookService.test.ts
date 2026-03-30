import { after } from "node:test";
import type { BookRepositoryInterface } from "../dataAccess/bookRepositoryInterface.js";
import { BookService } from "./bookService.js";
import type { Book } from "@prisma/client";

// 依存しているBookRepositoryInterfaceのモックを作成
const mockBookRepository: jest.Mocked<BookRepositoryInterface> = {
  create: jest.fn(),
  findById: jest.fn(),
};

describe("BookService", () => {
  let bookService: BookService;

  beforeEach(() => {
    // BookServiceのインスタンスを作成し、モックのBookRepositoryを注入
    bookService = new BookService(mockBookRepository);
  });

  afterEach(() => {
    // モックの呼び出し履歴をリセット
    jest.clearAllMocks();
  });

  it("書籍の登録が成功すること", async () => {
    // 登録する書籍の設定
    const newBook: Book = {
      id: "1",
      title: "Test Book",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // モックのcreateメソッドが呼び出されたときに、newBookを返すように設定
    mockBookRepository.create.mockResolvedValue(newBook);

    // BookServiceのaddメソッドを呼び出す
    const result = await bookService.add("Test Book");

    // 結果がnewBookと等しいことを確認
    expect(result).toEqual(newBook);

    // モックのcreateメソッドが正しい引数で呼び出されたことを確認
    expect(mockBookRepository.create).toHaveBeenCalledWith("Test Book");
  });

  it("IDで書籍を検索できること", async () => {
    // 検索する書籍の設定
    const existingBook: Book = {
      id: "1",
      title: "Existing Book",
      isAvailable: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // モックのfindByIdメソッドが呼び出されたときに、existingBookを返すように設定
    mockBookRepository.findById.mockResolvedValue(existingBook);
    // BookServiceのfindByIdメソッドを呼び出す
    const result = await bookService.findById("1");

    // 結果がexistingBookと等しいことを確認
    expect(result).toEqual(existingBook);
    // モックのfindByIdメソッドが正しい引数で呼び出されたことを確認
    expect(mockBookRepository.findById).toHaveBeenCalledWith("1");
  });
});
