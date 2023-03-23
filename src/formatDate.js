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
  const firstSeparator = fromFormat[fromFormat.length - 1];
  const firstFomat = fromFormat.slice(0, 3);
  const firstDateTo = date.split(firstSeparator);

  let day;
  let month;
  let year;

  for (let i = 0; i < firstFomat.length; i++) {
    if (firstFomat[i].includes('DD')) {
      day = firstDateTo[i];
    }

    if (firstFomat[i].includes('MM')) {
      month = firstDateTo[i];
    }

    if (firstFomat[i].includes('YY')) {
      if (firstFomat[i].length === 4) {
        year = firstDateTo[i].slice(2);
      } else {
        year = firstDateTo[i];
      }
    }
  }

  const secondSeparator = toFormat[toFormat.length - 1];
  const secondFormat = toFormat.slice(0, 3);
  const finalDate = [];

  for (let i = 0; i < secondFormat.length; i++) {
    if (secondFormat[i].includes('DD')) {
      finalDate.push(day);
    }

    if (secondFormat[i].includes('MM')) {
      finalDate.push(month);
    }

    if (secondFormat[i].includes('YY')) {
      if (secondFormat[i].length === 4) {
        if (year < 30) {
          year = `20${year}`;
        } else {
          year = `19${year}`;
        }
      }

      finalDate.push(year);
    }
  }

  return finalDate.join(secondSeparator);
}

module.exports = formatDate;
