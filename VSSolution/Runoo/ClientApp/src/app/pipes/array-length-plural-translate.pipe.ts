import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PluralTranslatePipe } from './plural-translate.pipe';

@Pipe({
  name: 'arrayLengthPluralTranslate',
  pure: false
})
export class ArrayLengthPluralTranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService,
    private pluralPipe: PluralTranslatePipe
  ) { }

  transform(array: any[], translateTK: string): string {

    let num: number = 0;
    if (array)
      num = array.length;

    return this.translate.instant(this.pluralPipe.transform(num, translateTK), { count: num });
  }
}
