export class Comment {

  id: number;
  content: string;
  parentId: number;
  authorId: string;
  author: { userName: string, avatarPath: string };
  creationTime: any;
}
