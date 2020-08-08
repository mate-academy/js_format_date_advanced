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
  // write code here
  const newDate = [];
  const value = date.split(fromFormat[fromFormat.length - 1]);
  const obj = {
    [fromFormat[0]]: value[0],
    [fromFormat[1]]: value[1],
    [fromFormat[2]]: value[2],
  };

  for (let i = 0; i < toFormat.length; i++) {
    if (obj.hasOwnProperty(toFormat[i])) {
      newDate.push(obj[toFormat[i]]);
    }
  }

  if (obj.hasOwnProperty('YY') === toFormat.includes('YY')
  || obj.hasOwnProperty('YYYY') === toFormat.includes('YYYY')) {
    return newDate.join(toFormat[toFormat.length - 1]);
  }

  if (obj.hasOwnProperty('YY')) {
    if (Number(obj.YY) > 20) {
      newDate.push('19' + obj.YY);
    } else {
      newDate.push('20' + obj.YY);
    }
  }

  if (obj.hasOwnProperty('YYYY')) {
    newDate.push(obj.YYYY.split('').splice(2, 2).join(''));
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
