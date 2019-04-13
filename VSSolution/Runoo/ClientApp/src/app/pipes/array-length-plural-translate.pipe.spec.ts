import { ArrayLengthPluralTranslatePipe } from './array-length-plural-translate.pipe';

describe('ArrayLengthPluralTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayLengthPluralTranslatePipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
