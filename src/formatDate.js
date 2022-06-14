/* eslint-disable no-unused-expressions */
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
  let separator = fromFormat[3];
  const splitedDate = date.split(separator);
  const toFormatWithOutSep = toFormat.splice(0, 3);
  const arrResult = [];
  const objDateInfo = {
    YY: 'YY',
    MM: 'MM',
    DD: 'DD',
    YYYY: 'YYYY',
  };

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY' :
        objDateInfo['YYYY'] = splitedDate[i];
        objDateInfo['YY'] = splitedDate[i].slice(-2);
        break;
      case 'DD' :
        objDateInfo['DD'] = splitedDate[i];
        break;
      case 'MM':
        objDateInfo['MM'] = splitedDate[i];
        break;
      case 'YY':
        objDateInfo['YY'] = splitedDate[i];
        objDateInfo['YYYY'] = transform(splitedDate[i]);
        break;
    }
  }

  for (const char of toFormatWithOutSep) {
    arrResult.push(objDateInfo[char]);
  }
  separator = toFormat.slice(-1);

  return arrResult.join(separator);
}

function transform(date) {
  return date <= 29 ? 20 + date : 19 + date;
}
module.exports = formatDate;
