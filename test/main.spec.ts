import * as chai from 'chai';
import { excelReaderObject } from '../src/index-backend';

const expect = chai.expect;

describe('excel reader object', () => {
  it('load data', async () => {
    excelReaderObject.init({
      path: './test/fixtures/basic-2003.xls'
    });

    const res = await excelReaderObject.load();

    expect(res.columns).to.deep.equal([ 'geo', 'time', 'GDP', 'LEX', 'POP', 'world_region', 'category' ]);
    expect(res.rows.length).to.equal(6600);
  });
});
