export class GetChapterRVM {

  content: string;
  lastStateChangeTime: string;
  name: string;
  chapterStateTK: string;
  book: {
    title: string;
    chapters: {
      id: number;
      name: string;
    }[];
  };
  comments: {
    id: number;
    parentId: number;
    content: string;
    creationTime: string;
    user: {
      userName: string;
      avatarPath: string;
    }
  }[];
}
