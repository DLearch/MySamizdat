import { User } from './user';
import { Chapter } from './chapter';
import { Comment } from '../components/comments/comment';

export class Book {
  id: number;

  title: string;

  ownerId: string;
  owner: User;

  comments: Comment[];

  mainImagePath: string;

  chapters: Chapter[];
}
