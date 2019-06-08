import { Component, OnInit } from '@angular/core';
import { UserControllerService } from 'src/app/api/user/user-controller.service';
import { FormGroup, Validators } from '@angular/forms';
import { InputTemplate } from 'src/app/components/form/input-template';
import { Router } from '@angular/router';

@Component({
  selector: 'app-support-page',
  templateUrl: './support-page.component.html',
  styleUrls: ['./support-page.component.css']
})
export class SupportPageComponent implements OnInit {

  componentTK = 'page.support.';
  formTemplate: InputTemplate[];
  formErrors: any;

  constructor(
    private userController: UserControllerService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formTemplate = [
      {
        name: 'senderEmail',
        tk: 'email',
        type: 'email',
        validators: [Validators.required, Validators.email]
      },
      {
        name: 'message',
        tk: 'message',
        type: 'textarea',
        validators: [Validators.required]
      }
    ];
  }

  send(form: FormGroup) {

    if (form.valid) {

      this.userController.sendEmail(form.value.senderEmail, form.value.message)
        .subscribe(() => this.router.navigate(['']),
          response => this.formErrors = response);
    }
    else for (let control in form.controls)
      form.controls[control].markAsTouched();
  }
}
