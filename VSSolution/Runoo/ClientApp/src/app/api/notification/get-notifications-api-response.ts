export class GetNotificationsApiResponse {
  id: number;
  creationTime: string;
  isChecked: boolean;
  discriminator: string;
  teamName?: string;
  inviterName?: string;
}
