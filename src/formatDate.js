'use strict';

/**
 * Time flies, standards change. Let's get rid of
 * the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts
 * the `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function
 * returns given date in `toFormat` format.
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
  const arr = date.split(fromFormat[3]);
  const format = {};
  const ans = [];

  format['MM'] = arr[fromFormat.indexOf('MM')];
  format['DD'] = arr[fromFormat.indexOf('DD')];

  if (fromFormat.includes('YY')) {
    format['YY'] = arr[fromFormat.indexOf('YY')];

    format['YYYY'] = Number(format['YY']) > 21
      ? '19' + format['YY'] : '20' + format['YY'];
  } else {
    format['YYYY'] = arr[fromFormat.indexOf('YYYY')];
    format['YY'] = format['YYYY'].substr(2);
  }

  for (let i = 0; i < 3; i++) {
    ans[i] = format[toFormat[i]];
  }

  return ans.join(toFormat[3]);
}

module.exports = formatDate;
