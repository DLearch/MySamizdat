export class GetChapterRVM {

  content: string;
  creationTime: string;
  name: string;
  book: {
    id: number;
    title: string;
    chapters: {
      id: number;
      name: string;
    }[];
  };
  comments: {
    id: number;
    userName: string;
    avatarPath: string;
  }[];
}
