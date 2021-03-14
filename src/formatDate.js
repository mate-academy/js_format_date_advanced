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
  const dateIn = date.split(fromFormat[3]);
  let year, month, day;
  const res = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case (`YYYY`): {
        year = dateIn[i];
        continue;
      }

      case (`YY`) : {
        if (dateIn[i] < 30) {
          year = `20` + dateIn[i];
        } else {
          year = `19` + dateIn[i];
        }
        continue;
      }

      case (`MM`) : {
        month = dateIn[i];
        continue;
      }

      case (`DD`) : {
        day = dateIn[i];
        continue;
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case (`YYYY`) : {
        res.push(year);
        continue;
      }

      case (`YY`) : {
        res.push(`${year[2]}` + `${year[3]}`);
        continue;
      }

      case (`MM`) : {
        res.push(month);
        continue;
      }

      case (`DD`) : {
        res.push(day);
      }
    }
  }

  return res.join(toFormat[3]);
}

module.exports = formatDate;
