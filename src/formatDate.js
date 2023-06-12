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
  const toFormatDate = [];
  let fromFormatDate = [];
  let day = '';
  let year = '';
  let month = '';

  if (date.includes('/')) {
    fromFormatDate = date.split('/');
  }

  if (date.includes('-')) {
    fromFormatDate = date.split('-');
  }

  if (date.includes('.')) {
    fromFormatDate = date.split('.');
  }

  for (let i = 0; i < fromFormatDate.length; i++) {
    if (fromFormat[i].includes('M')) {
      month = fromFormatDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = fromFormatDate[i];
    }

    if (fromFormat[i].includes('Y')) {
      year = fromFormatDate[i];
    }
  }

  for (let n = 0; n < fromFormatDate.length; n++) {
    if (toFormat[n].includes('M')) {
      toFormatDate[n] = month;
    }

    if (toFormat[n].includes('D')) {
      toFormatDate[n] = day;
    }

    if (toFormat[n].includes('Y')) {
      if ((year.length === 4) && (toFormat[n].length === 2)) {
        toFormatDate[n] = year.slice(-2);
      } else if ((year.length === 2) && (toFormat[n].length === 4)) {
        if (Number(year) < 30) {
          toFormatDate[n] = '20' + year;
        } else {
          toFormatDate[n] = '19' + year;
        }
      } else {
        toFormatDate[n] = year;
      }
    }
  }

  const result = toFormatDate.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
