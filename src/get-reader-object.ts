import { read, utils } from 'xlsx';
import { IReader } from './interfaces';

function getDsvFromJSON(json) {
  return { columns: json[0], rows: json.slice(1) };
}

export const getReaderObject = (fileReader: IReader) => ({
  _name: "excel",

  init(readerInfo) {
    this._lastModified = readerInfo.lastModified || '';
    this._basePath = readerInfo.path;
    this.keySize = readerInfo.keySize || 1;
    this.assetsPath = readerInfo.assetsPath || '';
  },

  async getAsset(asset) {
    return new Promise((resolve, reject) => {
      resolve();
    });
  },

  async load() {
    return new Promise((resolve, reject) => {
      fileReader.readText(this._basePath, (err, content) => {
        if (err) {
          return reject(err);
        }

        const workbook = read(content, { type: 'binary' });
        const wsName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[wsName];
        const json = utils.sheet_to_json(worksheet, { header: 1 });

        resolve(getDsvFromJSON(json));
      });
    });
  }
});
