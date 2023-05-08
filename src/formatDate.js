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
  const fromObject = {};
  const toObject = {};

  const separatorFrom = fromFormat.splice(-1);
  const separatorTo = toFormat.splice(-1);
  const dateArr = date.split(separatorFrom);

  for (let i = 0; fromFormat.length > i; i++) {
    fromObject[fromFormat[i]] = dateArr[i];
  }

  for (let i = 0; toFormat.length > i; i++) {
    toObject[toFormat[i]] = '';
  }

  for (let key in fromObject) {
    let value = '';
    const loopObjectKey = fromObject[key];

    if (!(key in toObject) && key === 'YYYY') {
      value = loopObjectKey.slice(-2);
      key = 'YY';
      toObject[key] = value;
    } else if (!(key in toObject) && key === 'YY') {
      if (loopObjectKey < 30) {
        value = `20${loopObjectKey}`;
      } else {
        value = `19${loopObjectKey}`;
      }
      key = 'YYYY';
      toObject[key] = value;
    } else if (key in toObject) {
      toObject[key] = loopObjectKey;
    }
  }

  let result = '';

  for (const key in toObject) {
    result = `${result}${toObject[key]}${separatorTo}`;
  }

  return result.slice(0, -1);
}

module.exports = formatDate;
