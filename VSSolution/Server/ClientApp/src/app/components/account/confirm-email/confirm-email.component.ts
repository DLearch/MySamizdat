import { Component } from '@angular/core';
import { EmailConfirmationService } from 'src/app/services/email-confirmation/email-confirmation.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css']
  , providers: [EmailConfirmationService]
})
export class ConfirmEmailComponent {

  constructor(
    emailConfirmationService: EmailConfirmationService
    , router: Router
    , activateRoute: ActivatedRoute
  ) {
    activateRoute.queryParams.subscribe(params => {
      emailConfirmationService
        .confirm({
          Email: params['email']
          , Token: decodeURIComponent(params['token'])
        })
        .subscribe(
          () => router.navigate(['email-confirmed'])
          , () => router.navigate(['email-unconfirmed'])
        );
    });
  }

}
