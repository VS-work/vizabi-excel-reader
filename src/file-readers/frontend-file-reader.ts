import { IReader } from '../interfaces';

require('fetch-polyfill');

declare const fetch;

export class FrontendFileReader implements IReader {
  readText(filePath: string, onFileRead: Function) {
    fetch(filePath)
      .then(response => response.blob())
      .then(blob => {
        onFileRead(null, blob);
      })
      .catch(err => {
        onFileRead(`${filePath} read error: ${err}`);
      });
  }
}
