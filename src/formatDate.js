'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine
 * of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns
 * given date in `toFormat` format.
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
  const result = [];

  const separatorOld = fromFormat[3];
  const separatorNew = toFormat[3];

  const oldDate = date.split(separatorOld);

  const oldFormat = fromFormat.slice(0, 4);
  const newFormat = toFormat.slice(0, 4);

  for (const newTime of newFormat) {
    for (const oldTime of oldFormat) {
      const index = oldFormat.indexOf(oldTime);

      if (newTime[0] === oldTime[0]) {
        switch (newTime[0]) {
          case 'Y':
            if (newTime.length === 4 && oldTime.length === 2) {
              if (+oldDate[index] > 50 && +oldDate[index] <= 99) {
                result.push('19' + oldDate[index]);
              } else {
                result.push('20' + oldDate[index]);
              }
            } else if (newTime.length === 2 && oldTime.length === 4) {
              result.push(oldDate[index][2] + oldDate[index][3]);
            } else {
              result.push(oldDate[index]);
            }
            break;

          default:
            result.push(oldDate[index]);
        }
      }
    }
  }

  return result.join(separatorNew);
}

module.exports = formatDate;
