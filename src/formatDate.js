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
  const toMonthIndex = toFormat.indexOf('MM');
  const toDayIndex = toFormat.indexOf('DD');
  let toYearIndex = 0;
  let toYear = '';

  if (toFormat.includes('YY')) {
    toYearIndex = toFormat.indexOf('YY');
  } else {
    toYearIndex = toFormat.indexOf('YYYY');
  }

  const newFormatArray = new Array(3);
  const dateArray = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (true) {
      case fromFormat[i].includes('DD'):
        newFormatArray[toDayIndex] = dateArray[i];
        continue;

      case fromFormat[i].includes('MM'):
        newFormatArray[toMonthIndex] = dateArray[i];
        continue;

      case fromFormat[i].includes('YYYY')
        || fromFormat[i].includes('YY'):
        newFormatArray[toYearIndex] = dateArray[i];
        break;
    }
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    toYear = newFormatArray[toYearIndex].slice(2);
    newFormatArray[toYearIndex] = toYear;
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    if (+newFormatArray[toYearIndex] < 30) {
      toYear = `20${newFormatArray[toYearIndex]}`;
      newFormatArray[toYearIndex] = toYear;
    } else {
      toYear = `19${newFormatArray[toYearIndex]}`;
      newFormatArray[toYearIndex] = toYear;
    }
  }

  const result = newFormatArray.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
