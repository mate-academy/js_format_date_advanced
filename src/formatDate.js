'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 // eslint-disable-next-line max-len
 * the old `fromFormat` newDateay and the new `toFormat` newDateay. Function
 * returns given date in new format.
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
  const dateValue = {
    day: 0,
    month: 0,
    year: 0,
  };

  const newDate = [];
  const oldDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        dateValue.day = oldDate[i];
        break;

      case 'MM':
        dateValue.month = oldDate[i];
        break;

      case 'YY':
      case 'YYYY':
        dateValue.year = oldDate[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newDate.push(dateValue.day);
        break;
      case 'MM':
        newDate.push(dateValue.month);
        break;
      case 'YY':
        if (dateValue.year.length === 4) {
          const y = dateValue.year[2] + '' + dateValue.year[3];

          newDate.push(y);
        } else {
          newDate.push(dateValue.year);
        }
        break;

      case 'YYYY':
        if (dateValue.year.length === 2) {
          if (dateValue.year >= 30) {
            dateValue.year = 19 + '' + dateValue.year;
            newDate.push(dateValue.year);
          } else {
            dateValue.year = 20 + '' + dateValue.year;
            newDate.push(dateValue.year);
          }
        } else {
          newDate.push(dateValue.year);
        }
        break;
      default:
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
