export class GetBooksApiResponse {
  length: number;
  page: number;
  books: {
    id: number;
    title: string;
    coverPath: string;
  }[];
}
