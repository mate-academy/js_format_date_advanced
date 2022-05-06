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
  const toSeparator = toFormat[toFormat.length - 1];
  const fromSeperator = fromFormat[fromFormat.length - 1];
  const dateArray = date.split(fromSeperator);
  let dateYear;
  let dateMonth;
  let dateDay;
  const dateOutput = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        dateYear = dateArray[i];
        break;

      case 'YY':
        dateYear = dateArray[i];
        break;

      case 'MM':
        dateMonth = dateArray[i];
        break;

      case 'DD':
        dateDay = dateArray[i];
        break;

      default:
        Error('Invalid date format');
    }
  }

  if (dateYear.length === 2) {
    if (parseInt(dateYear) < 30) {
      dateYear = `20${dateYear}`;
    } else {
      dateYear = `19${dateYear}`;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        dateOutput[dateOutput.length] = dateYear;
        break;

      case 'YY':
        dateOutput[dateOutput.length] = dateYear.slice(2);
        break;

      case 'MM':
        dateOutput[dateOutput.length] = dateMonth;
        break;

      case 'DD':
        dateOutput[dateOutput.length] = dateDay;
        break;

      default:
        Error('Invalid date format');
    }
  }

  return dateOutput.join(toSeparator);
}

module.exports = formatDate;
