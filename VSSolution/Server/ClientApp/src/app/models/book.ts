import { User } from './user';
import { BookComment } from './book-comment';
import { Chapter } from './chapter';

export class Book {
  id: number;

  title: string;

  ownerId: string;
  owner: User;

  comments: BookComment[];

  mainImagePath: string;

  chapters: Chapter[];
}
