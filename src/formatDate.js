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
  const fromObject = {
    dayId: fromFormat.indexOf('DD'),
    monthId: fromFormat.indexOf('MM'),
    yearId: fromFormat.indexOf('YYYY'),
    shortYearId: fromFormat.indexOf('YY'),
  };

  const toObject = {
    dayId: toFormat.indexOf('DD'),
    monthId: toFormat.indexOf('MM'),
    yearId: toFormat.indexOf('YYYY'),
    shortYearId: toFormat.indexOf('YY'),
  };

  const fromDateArray = date.split(fromFormat[3]);
  const toDateArray = [];

  toDateArray[toObject.dayId] = fromDateArray[fromObject.dayId];
  toDateArray[toObject.monthId] = fromDateArray[fromObject.monthId];
  toDateArray[toObject.yearId] = fromDateArray[fromObject.yearId];

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (fromDateArray[fromObject.shortYearId] >= 30) {
      toDateArray[toObject.yearId] = '19'
      + fromDateArray[fromObject.shortYearId];
    } else {
      toDateArray[toObject.yearId] = '20'
      + fromDateArray[fromObject.shortYearId];
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    toDateArray[toObject.shortYearId]
    = fromDateArray[fromObject.yearId].slice(2);
  }

  return toDateArray.join(toFormat[3]);
}

module.exports = formatDate;
