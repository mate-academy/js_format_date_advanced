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
  const obj = {};
  const Arr = [];
  const separator = fromFormat[3];
  const separator2 = toFormat[3];
  const dateArr = date.split(separator);

  obj[fromFormat[0]] = dateArr[0];
  obj[fromFormat[1]] = dateArr[1];
  obj[fromFormat[2]] = dateArr[2];

  const toFormatSliced = toFormat.slice(0, 3);

  for (const key of toFormatSliced) {
    if (key === 'YY' && !('YY' in obj) && 'YYYY' in obj) {
      obj['YY'] = obj['YYYY'].slice(-2);
    }

    if (key === 'YYYY' && !('YYYY' in obj) && 'YY' in obj) {
      const yy = parseInt(obj['YY'], 10);

      if (yy < 30) {
        obj['YYYY'] = '20' + obj['YY'];
      } else {
        obj['YYYY'] = '19' + obj['YY'];
      }
    }

    Arr.push(obj[key]);
  }

  const res = Arr.join(separator2);

  return res;
}

module.exports = formatDate;
