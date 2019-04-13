import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'pluralTranslate',
  pure: false
})
export class PluralTranslatePipe implements PipeTransform {

  constructor(
    private translate: TranslateService
  ) { }

  transform(value: number, translateTK?: string): string {

    let result;
    if (!value)
      result = 'none';
    else if (value == 1)
      result = 'one';
    else
      switch (this.translate.currentLang) {
        case 'Russian':
          result = this.getRussian(value);
          break;
        default:
          result = this.getEnglish(value);
          break;
      }

    if (translateTK)
      return 'count.' + translateTK + '.' + result;

    return 'count.' + result;
  }

  getRussian(value: number): string {

    value = value % 100;

    if (value > 10 && value < 21)
      return 'many';

    value = value % 10;
    if (value > 1 && value < 5)
      return 'many-few';

    if (value == 1)
      return 'many-one';

    return 'many';
  }

  getEnglish(value: number): string {

    return 'many';
  }
}
