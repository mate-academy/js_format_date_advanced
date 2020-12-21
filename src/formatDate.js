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
  const stplitedDate = date.split(fromFormat[3]);
  const resultDate = [...stplitedDate];

  const fromYearPosition = fromFormat.findIndex(x => x.includes('Y'));
  const toYearPosition = toFormat.findIndex(x => x.includes('Y'));

  const fromDayPosition = fromFormat.findIndex(x => x === 'DD');
  const toDayPosition = toFormat.findIndex(x => x === 'DD');

  const fromMonthPosition = fromFormat.findIndex(x => x === 'MM');
  const toMonthPosition = toFormat.findIndex(x => x === 'MM');

  if (fromYearPosition !== toYearPosition
    || fromDayPosition !== toDayPosition
    || fromMonthPosition !== toMonthPosition
  ) {
    resultDate[toYearPosition] = stplitedDate[fromYearPosition];
    resultDate[toDayPosition] = stplitedDate[fromDayPosition];
    resultDate[toMonthPosition] = stplitedDate[fromMonthPosition];
  }

  if (fromFormat[fromYearPosition] !== toFormat[toYearPosition]) {
    if (toFormat[toYearPosition] === 'YYYY') {
      if (resultDate[toYearPosition] < '30') {
        resultDate[toYearPosition] = '20' + resultDate[toYearPosition];
      } else {
        resultDate[toYearPosition] = '19' + resultDate[toYearPosition];
      }
    } else {
      resultDate[toYearPosition] = resultDate[toYearPosition].slice(2);
    }
  }

  return resultDate.join(toFormat[3]);
}

module.exports = formatDate;
