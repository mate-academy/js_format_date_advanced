'use strict';

/**
 * Time flies, standards change. Let's get rid of
 * the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts
 * the `date` string, the old `fromFormat` arrDateay variable,
 * and the new `toFormat` arrDateay variable. Function
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
  const arrDate = date.split(fromFormat[3]);
  const format = {};
  const result = [];

  format['MM'] = arrDate[fromFormat.indexOf('MM')];
  format['DD'] = arrDate[fromFormat.indexOf('DD')];

  if (fromFormat.includes('YY')) {
    format['YY'] = arrDate[fromFormat.indexOf('YY')];

    format['YYYY'] = Number(format['YY']) > 21
      ? '19' + format['YY'] : '20' + format['YY'];
  } else {
    format['YYYY'] = arrDate[fromFormat.indexOf('YYYY')];
    format['YY'] = format['YYYY'].substr(2);
  }

  for (let i = 0; i < 3; i++) {
    result[i] = format[toFormat[i]];
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
