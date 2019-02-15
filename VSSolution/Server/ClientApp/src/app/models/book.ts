import { User } from './user';
import { BookComment } from './book-comment';

export class Book {
  id: number;

  title: string;

  ownerId: string;
  owner: User;

  comments: BookComment[];
}
