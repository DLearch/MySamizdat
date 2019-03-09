export class GetTeamRVM {
  name: string;
  description: string;
  members: {
    userName: string;
    isOwner: boolean;
  }[];
}
