import { AbstractControl } from '@angular/forms';

export class AppValidators {
  static password(control: AbstractControl): { [key: string]: any } | null {
    
    return AppValidators.getPatternError(control, /^$|^[a-zA-Z0-9_\-@]{6,}$/);
  }

  static userName(control: AbstractControl): { [key: string]: any } | null {

    return AppValidators.getPatternError(control, /^$|^[a-zA-Z0-9_]{3,}$/);
  }

  private static getPatternError(control: AbstractControl, regex: RegExp): { [key: string]: any } | null {

    return (control.value as string).match(regex) ? null : { pattern: true };
  }
}
