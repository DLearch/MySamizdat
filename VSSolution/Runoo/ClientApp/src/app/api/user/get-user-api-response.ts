export class GetUserApiResponse {
  email: string;
  emailIsVisible: boolean;
  avatarPath: string;
  teams: {
    name: string;
    roleTK: string;
  };
}
