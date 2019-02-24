export class GetChapterRVM {

  content: string;
  creationTime: Date;
  name: string;
  book: {
    id: number;
    title: string;
  };
  comments: {
    id: number;
    userName: string;
    avatarPath: string;
  }[];
}
