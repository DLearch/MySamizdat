export class GetPageRVM {
  length: number;
  page: number;
  books: {
    id: number;
    title: string;
    coverPath: string;
  }[];
}
