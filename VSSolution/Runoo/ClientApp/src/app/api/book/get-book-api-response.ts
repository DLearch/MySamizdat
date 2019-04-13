export class GetBookApiResponse {

  title: string;
  authorName: string;
  bookStateTK: string;
  bookStateComment: string;
  description: string;
  discriminator: string;
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
    user: { userName: string, avatarPath: string };
  }[];
}
