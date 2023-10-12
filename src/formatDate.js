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
  const result = [];
  const oldFormat = {};
  const oldDate = date.split(`${fromFormat[3]}`);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      oldFormat['YY'] = oldDate[i];
    }

    if (fromFormat[i] === 'YYYY') {
      oldFormat['YYYY'] = oldDate[i];
    }

    if (fromFormat[i] === 'DD') {
      oldFormat['DD'] = oldDate[i];
    }

    if (fromFormat[i] === 'MM') {
      oldFormat['MM'] = oldDate[i];
    }
  }

  const corectYear = oldFormat['YY'] < 30 ? '20' : '19';

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YY':
        if (oldFormat['YY']) {
          result.push(oldFormat['YY']);
        } else {
          result.push(oldFormat['YYYY'].slice(-2));
        }
        break;
      case 'YYYY':
        if (oldFormat['YY']) {
          result.push(corectYear + oldFormat['YY']);
        } else {
          result.push(oldFormat['YYYY']);
        }
        break;
      case 'MM':
        result.push(oldFormat['MM']);
        break;
      case 'DD':
        result.push(oldFormat['DD']);
        break;
    }
  }

  return result.join(`${toFormat[3]}`);
}

module.exports = formatDate;
