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
  const newFormat = toFormat;
  const oldFormat = fromFormat;
  const newSeparator = newFormat.pop();
  const oldSeparator = oldFormat.pop();
  const oldVersionDate = date.split(oldSeparator);
  const newVersionDate = [];
  let day = '';
  let yearYY = '';
  let yearYYYY = '';
  let month = '';

  for (let i = 0; i < oldFormat.length; i++) {
    switch (oldFormat[i]) {
      case 'DD':
        day = oldVersionDate[i];
        break;

      case 'MM':
        month = oldVersionDate[i];
        break;

      case 'YY':
        yearYY = oldVersionDate[i];
        break;

      case 'YYYY':
        yearYYYY = oldVersionDate[i];
        break;
    }
  };

  for (let i = 0; i < newFormat.length; i++) {
    switch (newFormat[i]) {
      case 'DD':
        newVersionDate[i] = day;
        break;

      case 'MM':
        newVersionDate[i] = month;
        break;

      case 'YY':
        if (yearYY) {
          newVersionDate[i] = yearYY;
        };

        if (yearYYYY) {
          newVersionDate[i] = yearYYYY.slice(2);
        };

        break;

      case 'YYYY':
        if (yearYY) {
          if (yearYY < 30) {
            newVersionDate[i] = `20${yearYY}`;
          } else {
            newVersionDate[i] = `19${yearYY}`;
          }
        };

        if (yearYYYY) {
          newVersionDate[i] = yearYYYY;
        };

        break;
    }
  };

  return newVersionDate.join(newSeparator);
}

module.exports = formatDate;
