import { Component } from '@angular/core';
import { AccountService } from 'src/app/services/account/account.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { setErrors } from 'src/app/components/input/set-errors';
import { MyValidators } from 'src/app/MyValidators';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  public mainForm: FormGroup;
  returnUrl: string;

  public constructor(
    formBuilder: FormBuilder
    , private accountService: AccountService
    , private router: Router
    , private route: ActivatedRoute
  ) {
    
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.accountService.isAuthenticated)
      this.router.navigate([this.returnUrl]);

    this.mainForm = formBuilder.group({

      'email': ['', [Validators.required, Validators.email]]
      , 'password': ['', [Validators.required, MyValidators.password]]
    });

  }

  public mainSubmit(): void {

    if (this.mainForm.valid)
      this.accountService
        .authenticate(this.mainForm.value)
        .subscribe(
          () => this.router.navigate([this.returnUrl])
          , response => setErrors(response, this.mainForm)
        );
  }
}
