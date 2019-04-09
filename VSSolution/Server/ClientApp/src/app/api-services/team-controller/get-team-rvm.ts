export class GetTeamRVM {
  name: string;
  description: string;
  members: {
    userName: string;
    avatarPath: string;
    roleTK: string;
  }[];
}
