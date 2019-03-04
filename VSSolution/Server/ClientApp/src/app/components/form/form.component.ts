import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, ValidationErrors } from '@angular/forms';
import { ControlTemplate } from './control-template';
import { FormErrorDictionary } from './form-error-dictionary';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent {

  form: FormGroup;
  controlTemplates: ControlTemplate[];

  @Input() set errors(value: FormErrorDictionary) {

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

  @Input() set template(value: ControlTemplate[]) {

    let controls: { [key: string]: any } = {};

    for (let controlConfig of value) {
      controls[controlConfig.name] = ['', controlConfig.validators]
    }

    this.controlTemplates = value;
    this.form = this.formBuilder.group(controls);
  };

  constructor(
    private formBuilder: FormBuilder
  ) { }

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
