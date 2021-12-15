import handlebars from 'handlebars';

import { loadTemplate } from '../helpers';

const readFileAsyncReturn = 'Hi name, this is an email sent by Met Care';

jest.mock('util', () => ({
  __esModule: true,
  promisify: jest.fn().mockReturnValue(() => Promise.resolve(readFileAsyncReturn)),
}));

const mockedHandleBarsCompile = jest
  .spyOn(handlebars, 'compile')
  .mockImplementation(
    (source: string) => (context: any) => source.replace(new RegExp(context.old, 'g'), context.new)
  );

const makeSut = () => ({
  sut: loadTemplate,
});

describe('load-template email helper', () => {
  const { sut } = makeSut();

  it(`should inject the context data into template (source), the source content is 'Hi name, this is an email sent by Met Care'`, async () => {
    const result = await sut('my-template.hbs', { old: 'name', new: 'Jane Doe' });

    expect(result).toBe('Hi Jane Doe, this is an email sent by Met Care');
    expect(mockedHandleBarsCompile).toBeCalledWith(readFileAsyncReturn);
  });
});
