import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'arrayPluralTranslate',
  pure: false
})
export class ArrayPluralTranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) { }

  transform(array: any[], translateTK: string): string {

    let countTK: string;

    if (!array || !array.length)
      countTK = 'none';
    else if (array.length == 1)
      countTK = 'one';
    else
      switch (this.translate.currentLang) {
        case 'Русский':
          countTK = this.getRu(array.length);
          break;
        default:
          countTK = this.getEn(array.length);
          break;
      }

    return this.translate.instant(translateTK + '.count.' + countTK, { count: (array ? array.length: 0) });
  }
  getRu(value: number): string {

    value = value % 100;

    if (value > 10 && value < 21)
      return 'many';

    value = value % 10;
    if (value > 1 && value < 5)
      return 'few';

    if (value == 1)
      return 'one';

    return 'many';
  }

  getEn(value: number): string {

    return 'many';
  }
}
