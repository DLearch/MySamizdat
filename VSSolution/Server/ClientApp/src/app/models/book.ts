import { User } from './user';
import { Comment } from './comment';

export class Book {
  id: number;

  title: string;

  ownerId: string;
  owner: User;

  comments: Comment[];
}
