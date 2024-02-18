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
const MONTH = 'M';
const YEAR = 'Y';
const DAY = 'D';
const SHORT_YEAR_FORMAT = 'YY';

function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[3].toString());
  const newFormatDate = [];

  let year = 0;
  let month = 0;
  let day = 0;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i][0]) {
      case YEAR:
        year = arrDate[i];
        break;
      case MONTH:
        month = arrDate[i];
        break;
      case DAY:
        day = arrDate[i];
        break;
    }
  }

  for (const formatPart of toFormat) {
    if (formatPart.includes(YEAR)) {
      if (formatPart === SHORT_YEAR_FORMAT) {
        if (year.toString().length === 2) {
          newFormatDate.push(year);
        } else {
          newFormatDate.push(year.toString().slice(2, 4));
        }
      } else {
        if (year.toString().length === 2) {
          if (year > 24) {
            newFormatDate.push('19' + year);
          } else {
            newFormatDate.push('20' + year);
          }
        } else {
          newFormatDate.push(year);
        }
      }
    }

    if (formatPart.includes(MONTH)) {
      newFormatDate.push(month);
    }

    if (formatPart.includes(DAY)) {
      newFormatDate.push(day);
    }
  }

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
