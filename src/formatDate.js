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
  const arrDate = date.split(fromFormat[3]);
  const result = [];

  for (let i = 0; i < arrDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result.push(arrDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        result.push(arrDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          result.push(arrDate[fromFormat.indexOf('YY')]);
        } else {
          result.push(arrDate[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          result.push(arrDate[fromFormat.indexOf('YYYY')]);
        } else {
          if (+arrDate[fromFormat.indexOf('YY')] > 20) {
            result.push('19' + arrDate[fromFormat.indexOf('YY')]);
          } else {
            result.push('20' + arrDate[fromFormat.indexOf('YY')]);
          }
        }
        break;
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
