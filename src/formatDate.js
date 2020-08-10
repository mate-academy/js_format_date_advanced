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
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'],
 * ['DD', 'MM', 'YY', '/']) // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'],
 * ['DD', 'MM', 'YY', '/']) // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'],
 * ['DD', 'MM', 'YYYY', '.']) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const result = [];

  for (let i = 0; i < dateArr.length; i++) {
    switch (i) {
      case toFormat.indexOf('DD'):
        result.push(dateArr[fromFormat.indexOf('DD')]);
        break;

      case toFormat.indexOf('MM'):
        result.push(dateArr[fromFormat.indexOf('MM')]);
        break;

      case toFormat.indexOf('YY'):
        if (fromFormat.includes('YY')) {
          result.push(dateArr[fromFormat.indexOf('YY')]);
        } else {
          result.push(dateArr[fromFormat.indexOf('YYYY')].slice(-2));
        }
        break;

      case toFormat.indexOf('YYYY'):
        if (fromFormat.includes('YYYY')) {
          result.push(dateArr[fromFormat.indexOf('YYYY')]);
        } else {
          const year = dateArr[fromFormat.indexOf('YY')];

          if (year > 30) {
            result.push(`19${year}`);
          } else {
            result.push(`20${year}`);
          }
        }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
