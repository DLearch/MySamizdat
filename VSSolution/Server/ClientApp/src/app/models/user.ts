import { Team } from './team';

export class User {

  userName: string;

  email: string;
  emailConfirmed: boolean;
  emailIsVisible: boolean;

  phone: string;
  phoneConfirmed: boolean;

  teams: Team[];
}
