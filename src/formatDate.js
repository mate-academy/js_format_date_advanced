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
  let newDate = date;
  const dateArray = newDate.split(fromFormat[3]);
  const newDateArray = [];
  let yearIndex = 0;

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    yearIndex = fromFormat.indexOf('YY');

    const year = dateArray[yearIndex];

    if (year < 30) {
      dateArray[yearIndex] = `20${year}`;
    } else {
      dateArray[yearIndex] = `19${year}`;
    }
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    yearIndex = fromFormat.indexOf('YYYY');

    dateArray[yearIndex] = dateArray[yearIndex].slice(-2);
  }

  for (let i = 0; i < 3; i++) {
    let desired = toFormat[i];

    if (desired === 'YY' && !fromFormat.includes(desired)) {
      desired = 'YYYY';
    } else if (desired === 'YYYY' && !fromFormat.includes(desired)) {
      desired = 'YY';
    }

    yearIndex = fromFormat.indexOf(desired);

    newDateArray[i] = dateArray[yearIndex];
  }

  newDate = newDateArray.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
