import { TimePluralTranslatePipe } from './time-plural-translate.pipe';

describe('TimePluralTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new TimePluralTranslatePipe(null, null, null, null);
    expect(pipe).toBeTruthy();
  });
});
