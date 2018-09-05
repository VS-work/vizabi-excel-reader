import { FrontendFileReader } from './file-readers/frontend-file-reader';
import { getReaderObject } from './get-reader-object';

export const ExcelReader = getReaderObject(new FrontendFileReader());
