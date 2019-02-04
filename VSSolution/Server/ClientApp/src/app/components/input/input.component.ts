import { Component, Input, forwardRef} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input'
  , templateUrl: './input.component.html'
  , styleUrls: ['./input.component.css']
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

    if (find('required'))
      errors.push('empty');

    else if (find('maxlength'))
      errors.push('long');

    else if (find('minlength'))
      errors.push('short');

    else if (find('email') || find('pattern'))
      errors.push('wrong');

    else if (find('api'))
      for (let error of this.field.errors['api'])
        errors.push(error);

    return errors;
  }

  writeValue(value: string): void { }
  registerOnChange(fn: Function): void { }
  registerOnTouched(fn: Function): void { }
}
