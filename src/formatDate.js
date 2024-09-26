'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[3]);
  const res = [];

  for (let i = 0; i < arrDate.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        res.push(arrDate[fromFormat.indexOf('DD')]);
        break;

      case 'MM':
        res.push(arrDate[fromFormat.indexOf('MM')]);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          res.push(arrDate[fromFormat.indexOf('YY')]);
        } else {
          res.push(arrDate[fromFormat.indexOf('YYYY')].slice(2));
        }
        break;

      case 'YYYY':
        if (fromFormat.includes('YYYY')) {
          res.push(arrDate[fromFormat.indexOf('YYYY')]);
        } else {
          if (arrDate[fromFormat.indexOf('YY')] > 20) {
            res.push('19' + arrDate[fromFormat.indexOf('YY')]);
          } else {
            res.push('20' + arrDate[fromFormat.indexOf('YY')]);
          }
        }
        break;
    }
  }

  return res.join(toFormat[3]);
}

module.exports = formatDate;
