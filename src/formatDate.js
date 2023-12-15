'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
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
