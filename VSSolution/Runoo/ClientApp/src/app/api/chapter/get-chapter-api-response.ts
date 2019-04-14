export class GetChapterApiResponse {

  content: string;
  lastStateChangeTime: string;
  name: string;
  chapterStateTK: string;
  book: {
    title: string;
    teamName: string;
    chapters: {
      id: number;
      name: string;
    }[];
    user: {
      userName: string;
      avatarPath: string;
    };
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
