import { ArrayPluralTranslatePipe } from './array-plural-translate.pipe';

describe('ArrayPluralTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayPluralTranslatePipe(null);
    expect(pipe).toBeTruthy();
  });
});
