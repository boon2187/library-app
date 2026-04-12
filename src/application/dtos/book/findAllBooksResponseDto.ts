export interface FindAllBooksResponseDto {
  books: {
    id: string;
    title: string;
    isAvailable: boolean;
    createdAt: Date;
    updatedAt: Date;
  }[];
}
