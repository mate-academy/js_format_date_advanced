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

const DAY = 'DD';
const MONTH = 'MM';
const YEAR_SHORT = 'YY';
const YEAR_LONG = 'YYYY';

function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);

  const day = dateArr[fromFormat.indexOf(DAY)];
  const month = dateArr[fromFormat.indexOf(MONTH)];
  let year = dateArr[fromFormat.indexOf(YEAR_SHORT)];

  if (!year) {
    year = dateArr[fromFormat.indexOf(YEAR_LONG)];
  }

  const newFormatDate = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case DAY:
        newFormatDate.push(day);
        break;
      case MONTH:
        newFormatDate.push(month);
        break;
      case YEAR_SHORT:
        if (year.length === 2) {
          newFormatDate.push(year);
        } else {
          newFormatDate.push(year.slice(-2));
        }
        break;
      case YEAR_LONG:
        if (year.length === 4) {
          newFormatDate.push(year);
        } else {
          if (+year < 30) {
            newFormatDate.push(`20${year}`);
          } else {
            newFormatDate.push(`19${year}`);
          }
        }
        break;
      default:
        throw new Error('Wrong format');
    }
  }

  return newFormatDate.join(toFormat[3]);
}

module.exports = formatDate;
