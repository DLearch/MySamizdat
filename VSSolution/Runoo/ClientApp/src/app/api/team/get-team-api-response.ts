export class GetTeamApiResponse {
  name: string;
  description: string;
  members: {
    userName: string;
    avatarPath: string;
    roleTK: string;
  }[];
}
