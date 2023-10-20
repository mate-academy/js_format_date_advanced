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
  const YEAR_BORDER = 30;
  const currentSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const currentFormatDateArr = date.split(currentSeparator);
  const newFormatDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let fromFormatIndex = 0;
      fromFormatIndex < fromFormat.length - 1; fromFormatIndex++) {
      if (toFormat[i].includes(fromFormat[fromFormatIndex].slice(0, 1))) {
        newFormatDateArr[i] = currentFormatDateArr[fromFormatIndex];

        if (toFormat[i] !== fromFormat[fromFormatIndex]) {
          newFormatDateArr[i]
            = yearModify(currentFormatDateArr[fromFormatIndex], toFormat[i]);
        }
      }
    }
  }

  function yearModify(from, to) {
    if (from.length > to.length) {
      return from.slice(2); // saving 2 last numbers of year
    } else if (from < YEAR_BORDER) {
      return 20 + from;
    } else {
      return 19 + from;
    }
  }

  return newFormatDateArr.join(newSeparator);
}

module.exports = formatDate;
