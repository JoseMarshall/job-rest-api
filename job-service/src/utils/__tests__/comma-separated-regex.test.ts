import { commaSeparatedWordRegex } from '../regex';

const testCases: (string | boolean | any)[][] = [
  ['nodejs', true],
  ['html,css', true],
  ['typescript,mongodb,postgresql', true],
  ['123', true],

  ['reactjs, css', false],
  ['reactjs ,css', false],
  ['any,', false],
  ['any ', false],
  [' any', false],
  ['starUML,SQL,', false],
  ['', false],
  [' ', false],
];

describe('comma-separated-word-regex', () => {
  test.each(testCases)(
    `given %s testing with commaSeparatedWordRegex should result in %p`,
    (str: string, expectedMatchResult: boolean) => {
      expect(new RegExp(commaSeparatedWordRegex).test(str)).toBe(expectedMatchResult);
    }
  );
});
