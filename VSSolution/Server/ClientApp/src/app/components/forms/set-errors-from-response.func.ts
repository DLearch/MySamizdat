import { FormGroup } from '@angular/forms';

export function setErrorsFromResponse(response: any, form: FormGroup): void {
  
  for (let key in response) {
    
    if (form.controls[key]) {

      let errors: { [key: string]: any } = {};

      if (form.controls[key].errors)
        errors = form.controls[key].errors;

      for (let error of response[key])
        errors[error] = true;

      form.controls[key].setErrors(errors);
    }
  }
}
