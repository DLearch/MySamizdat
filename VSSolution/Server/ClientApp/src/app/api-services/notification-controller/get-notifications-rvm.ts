export class GetNotificationsRVM {
  id: number;
  creationTime: string;
  isChecked: boolean;
  discriminator: string;
  teamId?: number;
  teamName?: string;
  inviterName?: string;
}
