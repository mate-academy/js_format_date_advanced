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
  const formatedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    let indexOfPart = fromFormat.indexOf(toFormat[i]);

    switch (toFormat[i]) {
      case 'MM': {
        formatedDate[i] = dateParts[indexOfPart];
        break;
      }

      case 'DD': {
        formatedDate[i] = dateParts[indexOfPart];
        break;
      }

      case 'YY': {
        if (indexOfPart === -1) {
          indexOfPart = fromFormat.indexOf('YYYY');
        }

        formatedDate[i] = formatYear(dateParts[indexOfPart], toFormat[i]);
        break;
      }

      case 'YYYY': {
        if (indexOfPart === -1) {
          indexOfPart = fromFormat.indexOf('YY');
        }

        formatedDate[i] = formatYear(dateParts[indexOfPart], toFormat[i]);
        break;
      }
    }
  }

  return formatedDate.join(toFormat[toFormat.length - 1]);
}

function formatYear(year, format) {
  if (year.length === 2 && format === 'YYYY') {
    return +year < 30 ? `20${year}` : `19${year}`;
  } else if (year.length === 4 && format === 'YY') {
    return year.slice(2);
  } else {
    return year;
  }
}

module.exports = formatDate;
