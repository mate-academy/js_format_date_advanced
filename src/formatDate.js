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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const fromDate = date.split(fromSeparator);
  const toDate = [];
  let yearFormat;

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat.includes('YY')) {
      toDate[toFormat.indexOf('YY')] = fromDate[i];
      yearFormat = ['YY', fromDate[i], i];
    } else if (fromFormat[i] === 'YY' && toFormat.includes('YYYY')) {
      toDate[toFormat.indexOf('YYYY')] = fromDate[i];
      yearFormat = ['YYYY', fromDate[i], i];
    }

    if (toFormat.includes(fromFormat[i])) {
      toDate[toFormat.indexOf(fromFormat[i])] = fromDate[i];
    }
  }

  if (yearFormat && +yearFormat[1] < 22) {
    toDate[yearFormat[2]] = '20' + toDate[yearFormat[2]];

    return toDate.join(toSeparator);
  } else if (yearFormat && +yearFormat[1] < 100) {
    toDate[yearFormat[2]] = '19' + toDate[yearFormat[2]];

    return toDate.join(toSeparator);
  }

  if (yearFormat && +yearFormat[1] < 2000) {
    toDate[yearFormat[2]] = toDate[yearFormat[2]].slice(2);

    return toDate.join(toSeparator);
  }

  return toDate.join(toSeparator);
}

module.exports = formatDate;
