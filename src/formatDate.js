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
  // write code here
  const dateData = date.split(fromFormat[3]);
  const targetDateData = {};
  const coolResult = [];
  let year;

  const toFormatYearIndex = function(a, b) {
    const first = toFormat.indexOf(a);
    const second = toFormat.indexOf(b);

    return first === -1
      ? second
      : first;
  };

  const index = toFormatYearIndex('YYYY', 'YY');

  for (let i = 0; i <= fromFormat.length - 2; i++) {
    if (fromFormat[i][0] === 'Y') {
      const fromYearLength = fromFormat[i].length;
      const toYearLength = toFormat[index].length;

      switch (true) {
        case fromYearLength === toYearLength:
          year = dateData[i];

          break;

        case fromYearLength > toYearLength:
          year = dateData[i].slice(2);

          break;

        default:
          year = dateData[i] < 30
            ? '20' + dateData[i]
            : '19' + dateData[i];
      }

      targetDateData[toFormat[index]] = year;

      continue;
    }

    targetDateData[fromFormat[i]] = dateData[i];
  }

  for (let i = 0; i <= toFormat.length - 2; i++) {
    coolResult.push(targetDateData[toFormat[i]]);
  }

  return coolResult.join(toFormat[3]);
}

module.exports = formatDate;
