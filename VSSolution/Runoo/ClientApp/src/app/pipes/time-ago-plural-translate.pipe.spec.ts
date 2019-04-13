import { TimeAgoPluralTranslatePipe } from './time-ago-plural-translate.pipe';

describe('TimeAgoPluralTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimeAgoPluralTranslatePipe(null, null, null, null);
    expect(pipe).toBeTruthy();
  });
});
