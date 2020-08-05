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
  let myDate = date;
  myDate = myDate.split(fromFormat[fromFormat.length - 1]);
  let result = [];
  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
      result.push(myDate[fromFormat.indexOf('DD')])
      break;

      case 'MM':
      result.push(myDate[fromFormat.indexOf("MM")])
      break;

      case 'YY':
      if (fromFormat.indexOf['YY'] > -1) {
        result.push(myDate[fromFormat.indexOf('YY')])
      } else {
        result.push(myDate[fromFormat.indexOf('YYYY')].slice(2,4))
      }
      break;

      case 'YYYY':
      if (myDate[fromFormat.indexOf('YYYY')] > -1) {
        result.push(myDate[fromFormat.indexOf('YYYY')])
      } else {
        if (myDate[fromFormat.indexOf('YY')] > 20) {
          result.push('19' + myDate[fromFormat.indexOf('YY')])
        } else {
          result.push('20' + myDate[fromFormat.indexOf('YY')])
        }       
      }
      break;
    }
  }
  
  return result.join(toFormat[toFormat.length - 1])
}

module.exports = formatDate;
