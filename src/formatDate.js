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
  const FIRST_SPLITTER = fromFormat[3];

  const dateSplit = date.split(FIRST_SPLITTER);

  let year = '';

  if (fromFormat.indexOf('YYYY') !== -1) {
    year = dateSplit[fromFormat.indexOf('YYYY')];
  }

  if (fromFormat.indexOf('YY') !== -1) {
    year = dateSplit[fromFormat.indexOf('YY')];
  }

  const month = dateSplit[fromFormat.indexOf('MM')];
  const day = dateSplit[fromFormat.indexOf('DD')];

  const dateRearranged = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case ('YYYY'):
        if (year.length === 2) {
          if (year < 30) {
            dateRearranged.push(`20${year}`);
          } else {
            dateRearranged.push(`19${year}`);
          }
        } else {
          dateRearranged.push(year);
        }
        break;
      case ('YY'):
        if (year.length === 4) {
          dateRearranged.push(year.slice(-2));
        } else {
          dateRearranged.push(year);
        }
        break;
      case ('MM'):
        dateRearranged.push(month);
        break;
      case ('DD'):
        dateRearranged.push(day);
        break;
    }
  }

  return dateRearranged.join(toFormat[3]);
}

module.exports = formatDate;
