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

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        result[toFormat.indexOf('DD')] = oldDate[i];
        break;

      case 'MM':
        result[toFormat.indexOf('MM')] = oldDate[i];
        break;

      case 'YY':
        if (toFormat.includes('YYYY')) {
          if (+oldDate[i] >= 30 && +oldDate[i] <= 99) {
            result[toFormat.indexOf('YYYY')] = '19' + oldDate[i];
          } else {
            result[toFormat.indexOf('YYYY')] = '20' + oldDate[i];
          }
        } else {
          result[toFormat.indexOf('YY')] = oldDate[i];
        }
        break;

      case 'YYYY':
        if (toFormat.includes('YYYY')) {
          result[toFormat.indexOf('YYYY')] = oldDate[i];
        } else {
          result[toFormat.indexOf('YY')] = oldDate[i][2] + oldDate[i][3];
        }
        break;
    }
  }

  return result.join(separatorNew);
}

module.exports = formatDate;
