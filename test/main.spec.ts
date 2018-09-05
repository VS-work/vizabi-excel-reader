import * as chai from 'chai';
import { ExcelReader } from '../src/index-backend';

// const expect = chai.expect;

describe('Main', () => {
  it(`foo`, async () => {
    ExcelReader.init({
      path: './test/fixtures/basic-2003.xls'
    });

    const res = await ExcelReader.load();
    console.log(res);
  });
});
