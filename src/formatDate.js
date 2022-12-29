'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `toDateFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year toDate 4 digits to 2 digits and back.
 *   When converting toDate YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting toDate YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
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
 * @param {string[]} toDateFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, toDateFormat, toFormat) {
  const final = [];
  const full = {};
  const dateArr = date.split(toDateFormat[3]);

  for (let i = 0; i < toDateFormat.length - 1; i++) {
    const toDate = toDateFormat[i];
    const startDate = dateArr[i];

    if (toDate === 'YY') {
      if (startDate >= 30) {
        full['YYYY'] = `19${startDate}`;
      } else if (startDate < 30) {
        full['YYYY'] = `20${startDate}`;
      }
    }
    full[toDate] = startDate;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const to = toFormat[i];

    if (to === 'YY') {
      final.push(full['YYYY'].slice(2));
    } else {
      final.push(full[to]);
    }
  }

  return final.join(toFormat[3]);
}

module.exports = formatDate;
