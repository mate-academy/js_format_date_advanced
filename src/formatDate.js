'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const dateArrFormatted = [];

  function findElement(array, element) {
    // eslint-disable-next-line max-len
    return array[fromFormat.findIndex(el => el.slice(0, 2) === element.slice(0, 2))];
  }

  for (const i of toFormat) {
    for (const j of fromFormat) {
      if (i.length === 2 && j.length === 4 && i.slice(0, 2) === j.slice(0, 2)) {
        dateArrFormatted.push(findElement(dateArr, j).slice(2));
      }

      if (i.length === 4 && j.length === 2 && i.slice(0, 2) === j.slice(0, 2)) {
        if (findElement(dateArr, j).slice(0, 2) > 90
        && findElement(dateArr, j).slice(0, 2) <= 99) {
          dateArrFormatted.push('19' + findElement(dateArr, j).slice(0, 2));
        } else {
          dateArrFormatted.push('20' + findElement(dateArr, j).slice(0, 2));
        }
      }

      if (i === j) {
        dateArrFormatted.push(findElement(dateArr, j));
      }
    }
  }

  return dateArrFormatted.join(toFormat[3]);
}

module.exports = formatDate;
