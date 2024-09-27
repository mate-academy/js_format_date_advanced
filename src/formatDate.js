'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const TWENTY_FIRST_CENTURY = '20';
  const TWENTY_CENTURY = '19';
  const CENTURY_BORDER = 30;
  const SHORT_YEAR_FORMAT = -2;

  const oldDateObj = getDataObj(fromFormat);
  const newDataObj = getDataObj(toFormat);
  const oldDate = date.split(oldDateObj.separator);
  const newData = [];

  const day = oldDate[oldDateObj.indexD];
  const mans = oldDate[oldDateObj.indexM];
  let year = oldDate[oldDateObj.indexY];

  if (oldDateObj.formY.length > newDataObj.formY.length) {
    year = year.slice(SHORT_YEAR_FORMAT);
  } else if (newDataObj.formY.length > oldDateObj.formY.length) {
    year = +year < CENTURY_BORDER
      ? TWENTY_FIRST_CENTURY + year
      : TWENTY_CENTURY + year;
  }

  newData[newDataObj.indexD] = day;
  newData[newDataObj.indexM] = mans;
  newData[newDataObj.indexY] = year;

  return newData.join(newDataObj.separator);
}

function getDataObj(format) {
  const obj = {
    separator: format[format.length - 1],
    indexD: format.indexOf('DD'),
    indexM: format.indexOf('MM'),
    indexY: format.includes('YY')
      ? format.indexOf('YY')
      : format.indexOf('YYYY'),
  };

  obj.formY = format[obj.indexY];

  return obj;
}

module.exports = formatDate;
