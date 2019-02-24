export class GetBookRVM {
  title: string;
  description: string;
  coverPath: string;
  bookmark: boolean;
  user: {
    userName: string;
    avatarPath: string;
  };
  comments: {
    id: number;
    content: string;
    creationTime: Date;
    parentId: number;
    author: { userName: string, avatarPath: string };
  }[];
  chapters: {
    id: number;
    creationTime: Date;
    name: string;
  }[];
}
