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
  const separator = 3;
  const dateFrom = date.split(fromFormat[separator]);
  const newDate = [];

  const dayFormat = 'DD';
  const monthFormat = 'MM';
  const yearFormat = ['YY', 'YYYY'];

  const dayIndex = fromFormat.indexOf(dayFormat);
  const monthIndex = fromFormat.indexOf(monthFormat);
  let yearIndex = fromFormat.indexOf(yearFormat[0]);

  if (yearIndex < 0) {
    yearIndex = fromFormat.indexOf(yearFormat[1]);
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case dayFormat:
        newDate[i] = dateFrom[dayIndex];
        break;
      case monthFormat:
        newDate[i] = dateFrom[monthIndex];
        break;
      case fromFormat[yearIndex]:
        newDate[i] = dateFrom[yearIndex];
        break;
      case yearFormat[1]:
        if (Number(dateFrom[yearIndex]) < 30) {
          newDate[i] = (`20${dateFrom[yearIndex]}`);
        } else {
          newDate[i] = (`19${dateFrom[yearIndex]}`);
        }
        break;
      case yearFormat[0]:
        newDate[i] = dateFrom[yearIndex].slice(2);
        break;
      default:
        break;
    }
  }

  return newDate.join(toFormat[separator]);
}

module.exports = formatDate;
