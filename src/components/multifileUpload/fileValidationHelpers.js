import _ from 'lodash';

const validFileTypes =
  '.doc, .docx, .pdf, .xls, .xlsx, application/pdf, application/msword, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

const fileTypes = [
  '.doc',
  '.docx',
  '.pdf',
  '.xls',
  '.xlsx',
  'application/pdf',
  'application/msword',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const pdfFiles = ['.pdf', 'application/pdf'];

const isPdf = (fileType) => _.includes(pdfFiles, fileType);

const wordFiles = [
  '.doc',
  '.docx',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
];

const excelFiles = [
  '.xls',
  '.xlsx',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
];

const validFileType = (file) => fileTypes.includes(file.type);

const validFileSize = (file) => file.size <= 5000000;

export {
  validFileTypes,
  fileTypes,
  isPdf,
  pdfFiles,
  wordFiles,
  excelFiles,
  validFileType,
  validFileSize
};
