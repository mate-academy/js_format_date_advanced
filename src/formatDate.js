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
  const dateSeparatorIndex = 3;
  const partsOfDate = date.split(fromFormat[dateSeparatorIndex]);

  let year;
  let day;
  let month;

  for (let i = 0; i < fromFormat.length; i++) {
    const elementOfDate = partsOfDate[i];

    switch (fromFormat[i][0]) {
      case 'Y':
        year = elementOfDate;
        break;

      case 'D':
        day = elementOfDate;
        break;

      case 'M':
        month = elementOfDate;
        break;

      default:
        continue;
    }
  }

  const fullYearLength = 4;
  const centuryBrakePoint = 30;

  let fullYear = year.length < fullYearLength
  && parseInt(year) < centuryBrakePoint
    ? `20${year}`
    : `19${year}`;

  if (year.length === 4) {
    fullYear = year;
  }

  const newFormat = toFormat.slice(0, -1);

  for (let i = 0; i < newFormat.length; i++) {
    if (newFormat[i].startsWith('D')) {
      newFormat[i] = day;
    }

    if (newFormat[i].startsWith('M')) {
      newFormat[i] = month;
    }

    if (newFormat[i].startsWith('Y') && newFormat[i].length < fullYear.length) {
      newFormat[i] = fullYear.slice(2);
    }

    if (newFormat[i].startsWith('Y')
    && newFormat[i].length >= fullYear.length) {
      newFormat[i] = fullYear;
    }
  }

  const newDate = newFormat.join(toFormat[dateSeparatorIndex]);

  return newDate;
}

module.exports = formatDate;
