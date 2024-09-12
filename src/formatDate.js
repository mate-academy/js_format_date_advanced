'use strict';

/**
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
