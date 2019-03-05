import { ArrayPluralTranslatePipe } from './array-plural-translate.pipe';

describe('ArrayPluralTranslatePipe', () => {
  it('create an instance', () => {
    const pipe = new ArrayPluralTranslatePipe(null, null);
    expect(pipe).toBeTruthy();
  });
});
