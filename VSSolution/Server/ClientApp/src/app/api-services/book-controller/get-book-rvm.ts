export class GetBookRVM {
  title: string;
  description: string;
  coverPath: string;
  languageTK: string;
  originalTitle: string;
  originalLanguageTK: string;
  bookmark: boolean;
  user: {
    userName: string;
    avatarPath: string;
  };
  comments: {
    id: number;
    content: string;
    creationTime: string;
    parentId: number;
    //parent: {
    //  author: {
    //    userName: string;
    //  }
    //};
    author: { userName: string, avatarPath: string };
  }[];
  chapters: {
    id: number;
    creationTime: string;
    name: string;
  }[];
}
