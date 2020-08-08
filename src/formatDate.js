'use strict';

/**
 * Time flies, standards change. Let's get rid of the routine
 * of changing the date format,
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
  const newDate = [];
  const arrDate = date.split(fromFormat[3]);

  for (const newFormat of toFormat) {
    switch (newFormat) {
      case 'DD':
        newDate.push(arrDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        newDate.push(arrDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          newDate.push(arrDate[fromFormat.indexOf('YY')]);
        } else {
          newDate.push(arrDate[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          newDate.push(arrDate[fromFormat.indexOf('YYYY')]);
        } else {
          if (arrDate[fromFormat.indexOf('YY')][0] > 2) {
            newDate.push('19' + arrDate[fromFormat.indexOf('YY')]);
          } else {
            newDate.push('20' + arrDate[fromFormat.indexOf('YY')]);
          }
        }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
