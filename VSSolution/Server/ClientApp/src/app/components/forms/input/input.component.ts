import { Component, Input, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
  , providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }]
})
export class InputComponent implements ControlValueAccessor {

  @Input() fieldTK: string;
  @Input() field: FormControl;
  @Input() type: string;
  
  public get errorTKs(): string[] {

    if (!this.field || !this.field.errors)
      return null;

    const errors = [];
    const find: Function = key => this.field.errors.hasOwnProperty(key);
    
    if (find('required') || find('empty'))
      errors.push('empty');

    else if (find('maxlength') || find('long'))
      errors.push('long');

    else if (find('minlength') || find('short'))
      errors.push('short');

    else if (find('email') || find('pattern') || find('wrong'))
      errors.push('wrong');

    else
      for (let error in this.field.errors)
        errors.push(error);
    
    return errors;
  }
  
  writeValue(value: string): void {}
  registerOnChange(fn: Function): void {}
  registerOnTouched(fn: Function): void {}
}
