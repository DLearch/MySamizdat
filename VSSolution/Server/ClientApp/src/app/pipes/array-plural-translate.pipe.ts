import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PluralPipe } from './plural.pipe';

@Pipe({
  name: 'arrayPluralTranslate',
  pure: false
})
export class ArrayPluralTranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService,
    private pluralPipe: PluralPipe
  ) { }

  transform(array: any[], translateTK: string): string {

    let num: number = 0;
    if (array)
      num = array.length;

    return this.translate.instant(this.pluralPipe.transform(num, translateTK), { count: num });
  }
}
