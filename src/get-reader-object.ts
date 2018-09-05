import { read, utils } from 'xlsx';
import { IReader } from './interfaces';

function getDsvFromJSON(json) {
  const columns = json[0];
  const src = json.slice(1);

  const rows = src.map(record => {
    const newRecord = {};

    for (let i = 0; i < columns.length; i++) {
      newRecord[columns[i]] = record[i];
    }

    return newRecord;
  });

  return { columns, rows };
}

const cached = {};

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

  getCached() {
    return cached;
  },

  async load() {
    const { _basepath: path, _lastModified } = this;
    const cachedPromise = cached[path + _lastModified];

    return cachedPromise ? cachedPromise : cached[path + _lastModified] = new Promise((resolve, reject) => {
      fileReader.readText(this._basePath, (err, content) => {
        if (err) {
          return reject(err);
        }

        const workbook = read(content, { type: 'binary' });
        const wsName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[wsName];
        const json = utils.sheet_to_json(worksheet, { header: 1 });

        const result = getDsvFromJSON(json);

        console.log(result);

        resolve(result);
      });
    });
  }
});
