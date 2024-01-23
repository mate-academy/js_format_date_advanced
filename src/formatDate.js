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
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const resultDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const keyTo = toFormat[i];

    switch (keyTo) {
      case 'DD':
        const indexOfDay = fromFormat.indexOf('DD');

        resultDate[i] = dateParts[indexOfDay];
        break;

      case 'MM':
        const indexOfMounth = fromFormat.indexOf('MM');

        resultDate[i] = dateParts[indexOfMounth];
        break;

      case 'YYYY':
        let indexOfYear;

        if (fromFormat.indexOf('YY') >= 0) {
          indexOfYear = fromFormat.indexOf('YY');

          resultDate[i] = dateParts[indexOfYear] < 30
            ? `20${dateParts[indexOfYear]}`
            : `19${dateParts[indexOfYear]}`;
        } else {
          indexOfYear = fromFormat.indexOf('YYYY');
          resultDate[i] = dateParts[indexOfYear];
        }

        break;

      case 'YY':
        let indexOfShortYear;

        if (fromFormat.indexOf('YY') >= 0) {
          indexOfShortYear = fromFormat.indexOf('YY');
          resultDate[i] = dateParts[indexOfShortYear];
        } else {
          indexOfShortYear = fromFormat.indexOf('YYYY');
          resultDate[i] = dateParts[indexOfShortYear].slice(2);
        }
        break;
    }
  }

  return resultDate.join(separator);
}

module.exports = formatDate;
