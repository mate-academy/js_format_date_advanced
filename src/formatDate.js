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
  const formattedDateArr = [];
  let formattedYear;
  let day;
  let month;
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < dateParts.length; i++) {
    if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
      if (i === fromFormat.indexOf('YYYY')) {
        formattedYear = dateParts[i].slice(2);
      }
    } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
      if (i === fromFormat.indexOf('YY')) {
        if (dateParts[i] < 30) {
          formattedYear = `20${dateParts[i]}`;
        } else {
          formattedYear = `19${dateParts[i]}`;
        }
      }
    } else if (i === fromFormat.indexOf('YY')
    || i === fromFormat.indexOf('YYYY')) {
      formattedYear = dateParts[i];
    }

    if (i === fromFormat.indexOf('MM')) {
      month = dateParts[i];
    }

    if (i === fromFormat.indexOf('DD')) {
      day = dateParts[i];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      formattedDateArr.push(day);
    } else if (toFormat[i] === 'MM') {
      formattedDateArr.push(month);
    } else {
      formattedDateArr.push(formattedYear);
    }
  }

  return formattedDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
