/* eslint-disable max-len */
'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function returns given date in `toFormat` format.
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
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const oldDate = date.split(oldSeparator);
  const result = [];

  for (let i = 0; i < oldDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(oldDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        result.push(oldDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          result.push(oldDate[fromFormat.indexOf('YY')]);
        } else {
          result.push(oldDate[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          result.push(oldDate[fromFormat.indexOf('YYYY')]);
        } else {
          if (+oldDate[fromFormat.indexOf('YY')] > 20) {
            result.push('19' + oldDate[fromFormat.indexOf('YY')]);
          } else {
            result.push('20' + oldDate[fromFormat.indexOf('YY')]);
          }
        }
        break;

      default: return 'Wrong date format!';
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
