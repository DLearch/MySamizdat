export class GetBookRVM {
  title: string;
  authorName: string;
  bookStateTK: string;
  description: string;
  descriminator: string;
  teamName: string;
  languageTK: string;
  originalLanguageTK: string;
  originalTitle: string;
  coverPath: string;
  creationTime: string;
  bookmark: boolean;
  user: {
    userName: string;
    avatarPath: string;
  };
  chapters: {
    id: number;
    lastStateChangeTime: string;
    chapterStateTK: string;
    name: string;
  }[];
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
    user: { userName: string, avatarPath: string };
  }[];
}
