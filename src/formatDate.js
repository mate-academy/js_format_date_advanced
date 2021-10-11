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
  const oldDataSeparator = fromFormat[3];
  const newDataSeparator = toFormat[3];

  const dataParts = date.split(oldDataSeparator);
  const dateFomat = {};
  const newDataFormat = [];
  const yearFormat1 = 'YY';
  const yearFormat2 = 'YYYY';
  const yearsForChangingFormat = 30;

  for (let i = 0; i < fromFormat.length - 1; ++i) {
    if ((fromFormat[i] === yearFormat1 || fromFormat[i] === yearFormat2)
      && !toFormat.includes(fromFormat[i])) {
      let newYearFormat = '';
      let year = dataParts[i];

      if (fromFormat[i].length === yearFormat1.length) {
        newYearFormat = yearFormat2;

        year = (year >= yearsForChangingFormat)
          ? `${19}${year}`
          : `${20}${year}`;
      } else {
        newYearFormat = yearFormat1;
        year = year.slice(yearFormat1.length);
      }

      dateFomat[newYearFormat] = year;
    }
    dateFomat[fromFormat[i]] = dataParts[i];
  }

  for (let i = 0; i < toFormat.length - 1; ++i) {
    newDataFormat.push(dateFomat[toFormat[i]]);
  }

  return newDataFormat.join(newDataSeparator);
}

module.exports = formatDate;
