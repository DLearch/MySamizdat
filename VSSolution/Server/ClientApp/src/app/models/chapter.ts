import { Book } from './book';
import { Comment } from '../components/comments/comment';

export class Chapter {
  id: number;

  name: string;

  content: string;

  comments: Comment[];

  bookId: number;
  book: Book;
}
