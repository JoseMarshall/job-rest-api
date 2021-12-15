import fs from 'fs';
import handlebars from 'handlebars';
import path from 'path';
import { promisify } from 'util';

const readFileAsync = promisify(fs.readFile);

// eslint-disable-next-line import/prefer-default-export
export const loadTemplate = async (filename: string, context: unknown) => {
  const source = await readFileAsync(path.resolve('src/main/external/email/templates', filename), {
    encoding: 'utf-8',
  });

  const template = handlebars.compile(source);
  return template(context);
};
