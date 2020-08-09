'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 * // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 * // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.'])
 * // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let year = [];
  let month = 0;
  let day = 0;
  const oldDate = date.split(fromFormat[fromFormat.length - 1]);
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      year = oldDate[i].split('');
    }

    if (fromFormat[i].includes('M')) {
      month = oldDate[i];
    }

    if (fromFormat[i].includes('D')) {
      day = oldDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i].length === year.length) {
        newDate[i] = year.join('');
      } else {
        if (toFormat[i].length < year.length) {
          const shortYear = year.slice(2);

          newDate[i] = shortYear.join('');
        } else {
          if (toFormat[i].length > year.length) {
            if (+year.join('') <= 99 && +year.join('') > 20) {
              year.unshift('19');
              newDate[i] = year.join('');
            } else {
              year.unshift('20');
              newDate[i] = year.join('');
            }
          }
        }
      }
    }

    if (toFormat[i].includes('M')) {
      newDate[i] = month;
    }

    if (toFormat[i].includes('D')) {
      newDate[i] = day;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
