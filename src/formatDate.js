'use strict';

/**
 * Time flies, standards change. Let's get rid of the
 * routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the
 * `date` string, the old `fromFormat` array variable,
 * and the new `toFormat` array variable. Function
 * returns given date in `toFormat` format.
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
  const res = [];
  const t = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const d = {
    [fromFormat[0]]: t[0],
    [fromFormat[1]]: t[1],
    [fromFormat[2]]: t[2],
  };

  for (let i = 0; i < toFormat.length; i++) {
    if (d.hasOwnProperty(toFormat[i])) {
      res.push(d[toFormat[i]]);
    }
  }

  if (d.hasOwnProperty('YY') === toFormat.includes('YY')
  || d.hasOwnProperty('YYYY') === toFormat.includes('YYYY')) {
    return res.join(`${toFormat[toFormat.length - 1]}`);
  }

  if (d.hasOwnProperty('YY')) {
    if (Number(d.YY) > 21) {
      res.push('19' + d.YY);
    } else {
      res.push('20' + d.YY);
    }
  }

  if (d.hasOwnProperty('YYYY')) {
    res.push(d.YYYY.split('').splice(2, 2).join(''));
  }

  return res.join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
