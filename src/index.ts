import * as fs from 'fs';
import * as XLSX from 'xlsx';

function process_RS(stream: any, cb: Function) {
  const buffers: any[] = [];

  stream.on('data', function(data: any) { buffers.push(data); });
  stream.on('end', function() {
    var buffer = Buffer.concat(buffers);
    var workbook = XLSX.read(buffer, {type:"buffer"});

    cb(workbook);
  });
}

const rstream = fs.createReadStream('/home/vs/basic-2003.xls');

process_RS(rstream, (wb: any) => {
  console.log(wb);
});
