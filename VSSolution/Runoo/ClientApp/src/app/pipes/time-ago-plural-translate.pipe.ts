import { Pipe, PipeTransform, ChangeDetectorRef, NgZone } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { PluralTranslatePipe } from './plural-translate.pipe';

@Pipe({
  name: 'timeAgoPluralTranslate',
  pure: false
})
export class TimeAgoPluralTranslatePipe implements PipeTransform {

  private timer: number;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone,
    private translate: TranslateService,
    private pluralPipe: PluralTranslatePipe
  ) { }

  get(value: string): { number: number, translateKey: string } {
    this.removeTimer();
    let d = new Date(value);
    let now = new Date();
    let seconds = Math.round(Math.abs((now.getTime() - d.getTime()) / 1000));
    let timeToUpdate = (Number.isNaN(seconds)) ? 1000 : this.getSecondsUntilUpdate(seconds) * 1000;
    this.timer = this.ngZone.runOutsideAngular(() => {
      if (typeof window !== 'undefined') {
        return window.setTimeout(() => {
          this.ngZone.run(() => this.changeDetectorRef.markForCheck());
        }, timeToUpdate);
      }
      return null;
    });
    let minutes = Math.round(Math.abs(seconds / 60));
    let hours = Math.round(Math.abs(minutes / 60));
    let days = Math.round(Math.abs(hours / 24));
    let months = Math.round(Math.abs(days / 30.416));
    let years = Math.round(Math.abs(days / 365));
    if (Number.isNaN(seconds)) {
      return null;
    } else if (seconds <= 45) {
      return { number: 0, translateKey: 'minute' };//'a few seconds ago';
    } else if (seconds <= 90) {
      return { number: 1, translateKey: 'minute' };//'a minute ago';
    } else if (minutes <= 45) {
      return { number: minutes, translateKey: 'minute' };//minutes + ' minutes ago';
    } else if (minutes <= 90) {
      return { number: 1, translateKey: 'hour' };//'an hour ago';
    } else if (hours <= 22) {
      return { number: hours, translateKey: 'hour' };// hours + ' hours ago';
    } else if (hours <= 36) {
      return { number: 1, translateKey: 'day' };//'a day ago';
    } else if (days <= 25) {
      return { number: days, translateKey: 'day' };//days + ' days ago';
    } else if (days <= 45) {
      return { number: 1, translateKey: 'month' };//'a month ago';
    } else if (days <= 345) {
      return { number: months, translateKey: 'month' };//months + ' months ago';
    } else if (days <= 545) {
      return { number: 1, translateKey: 'year' };//'a year ago';
    } else { // (days > 545)
      return { number: years, translateKey: 'year' };//years + ' years ago';
    }
  }

  ngOnDestroy(): void {
    this.removeTimer();
  }

  private removeTimer() {
    if (this.timer) {
      window.clearTimeout(this.timer);
      this.timer = null;
    }
  }

  private getSecondsUntilUpdate(seconds: number) {
    let min = 60;
    let hr = min * 60;
    let day = hr * 24;
    if (seconds < min) { // less than 1 min, update every 2 secs
      return 2;
    } else if (seconds < hr) { // less than an hour, update every 30 secs
      return 30;
    } else if (seconds < day) { // less then a day, update every 5 mins
      return 300;
    } else { // update every hour
      return 3600;
    }
  }

  transform(date: string): string {

    let result: { number: number, translateKey: string } = this.get(date);

    return this.translate.instant(this.pluralPipe.transform(result.number, 'time.' + result.translateKey + '.ago'), { number: result.number });
  }
}
