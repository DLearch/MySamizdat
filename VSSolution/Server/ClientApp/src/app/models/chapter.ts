import { ChapterComment } from './chapter-comment';
import { Book } from './book';

export class Chapter {
  id: number;

  name: string;

  content: string;

  comments: ChapterComment[];

  bookId: number;
  book: Book;
}
