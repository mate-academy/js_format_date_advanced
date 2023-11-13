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
  const formated = [];
  const splitDate = date.split(fromFormat[3]);
  let year;
  let month;
  let day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = splitDate[i];
    }

    if (fromFormat[i] === 'MM') {
      month = splitDate[i];
    }

    if (fromFormat[i] === 'DD') {
      day = splitDate[i];
    }
  }

  for (const toForm of toFormat) {
    switch (toForm) {
      case ('DD'):
        formated.push(day);

        break;

      case ('MM'):
        formated.push(month);

        break;

      case ('YYYY'):
        if (year.length === 4) {
          formated.push(year);
        } else if (year < 30) {
          formated.push(20 + year);
        } else {
          formated.push(19 + year);
        }

        break;

      case ('YY'):
        if (year.length === 2) {
          formated.push(year);
        } else {
          formated.push(year.slice(2));
        }

        break;
    }
  }

  return formated.join(toFormat[3]);
}

module.exports = formatDate;
