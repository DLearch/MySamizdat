import { Component, Input } from '@angular/core';
import { InputTemplate } from './input-template';
import { FormGroup, ValidationErrors, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form: FormGroup;
  inputTemplates: InputTemplate[];

  @Input() set errors(value: { [key: string]: string[] }) {

    let adaptedKey: string;
    for (let key in value) {

      if (key)
        adaptedKey = key[0].toLowerCase() + key.slice(1);
      else
        adaptedKey = key;

      if (this.form.controls[adaptedKey]) {

        let errors: { [key: string]: any } = {};

        if (this.form.controls[adaptedKey].errors)
          errors = this.form.controls[adaptedKey].errors;

        let apiErrors: string[] = [];
        for (let error of value[key])
          apiErrors.push(error);

        errors['api'] = apiErrors;

        this.form.controls[adaptedKey].setErrors(errors);
      }
    }
  }

  @Input() set template(value: InputTemplate[]) {

    if (!value)
      value = [];

    let controls: { [key: string]: any } = {};

    for (let controlConfig of value) {
      controls[controlConfig.name] = [controlConfig.value ? controlConfig.value : '', controlConfig.validators]
    }

    this.inputTemplates = value;
    this.form = this.formBuilder.group(controls);
  };

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.form = new FormGroup({});
  }

  getErrorTKs(errors: ValidationErrors): string[] {

    const errorTKs: string[] = [];

    for (let errorKey in errors) {
      switch (errorKey) {

        case 'required':
          errorTKs.push('empty');
          break;

        case 'maxlength':
          errorTKs.push('long');
          break;

        case 'minlength':
          errorTKs.push('short');
          break;

        case 'email':
          errorTKs.push('wrong');
          break;

        case 'pattern':
          errorTKs.push('wrong');
          break;

        case 'api':
          for (let error of errors[errorKey])
            errorTKs.push(error);
          break;
      }
    }

    return errorTKs;
  }

}
