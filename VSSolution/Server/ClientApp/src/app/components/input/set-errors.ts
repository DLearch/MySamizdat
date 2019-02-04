import { FormGroup } from '@angular/forms';

export function setErrors(errorsDict: { [key: string]: string[] }, form: FormGroup): void {

  let adaptedKey: string;
  for (let key in errorsDict) {

    if (key)
      adaptedKey = key[0].toLowerCase() + key.slice(1);
    else
      adaptedKey = key;

    if (form.controls[adaptedKey]) {

      let errors: { [key: string]: any } = {};

      if (form.controls[adaptedKey].errors)
        errors = form.controls[adaptedKey].errors;

      let apiErrors: string[] = [];
      for (let error of errorsDict[key])
        apiErrors.push(error);

      errors['api'] = apiErrors;

      form.controls[adaptedKey].setErrors(errors);
    }
  }
}
