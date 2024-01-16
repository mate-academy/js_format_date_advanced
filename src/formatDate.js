'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 ~ to 2 digits and back.
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
  // write code here

  const firstDate = date.split(fromFormat[3]);

  const dayIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  let yearIndex;

  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      yearIndex = i;
    }
  }

  const day = firstDate[dayIndex];
  const month = firstDate[monthIndex];
  let year = firstDate[yearIndex];

  if (year < 30) {
    year = '20' + year;
  }

  if (year >= 30 && year < 100) {
    year = '19' + year;
  }

  for (let j = 0; j <= 2; j++) {
    switch (toFormat[j]) {
      case 'DD':
        toFormat[j] = day;
        break;
      case 'MM':
        toFormat[j] = month;
        break;
      case 'YY':
        toFormat[j] = '';

        if (year.length > 2) {
          for (let k = 2; k <= 3; k++) {
            toFormat[j] += year[k];
          }
        }
        break;
      case 'YYYY':
        toFormat[j] = year;
        break;
    }
  }

  const separator = toFormat.pop();

  const newDate = toFormat.join(separator);

  return newDate;
}

module.exports = formatDate;
