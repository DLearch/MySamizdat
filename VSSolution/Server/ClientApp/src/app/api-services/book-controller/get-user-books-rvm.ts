export class GetUserBooksRVM {
  length: number;
  page: number;
  books: {
    id: number;
    coverPath: string;
    title: string;
  }[];
}
