export class LoginApiResponse {

  userName: string;
  avatarPath: string;
  birthDate: string;
  teams: {
    teamName: string;
    teamMemberRoleTK: string;
  }[];
}
