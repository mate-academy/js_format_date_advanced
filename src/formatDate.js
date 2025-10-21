'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const rozdilnyk = fromFormat[fromFormat.length - 1];
  const parts = date.split(rozdilnyk);
  const obj = {};
  const returnObj = [];

  if (parts.length !== 3) {
    return;
  }

  for (let i = 0; i < 3; i++) {
    const keyDate = fromFormat[i];

    obj[keyDate] = parts[i];
  }

  const rozdilnyk2 = toFormat[toFormat.length - 1];

  for (let i = 0; i < 3; i++) {
    const x = toFormat[i];

    if (x === 'YY') {
      if (obj.YY) {
        returnObj.push(obj['YY']);
        returnObj.push(rozdilnyk2);
      }

      if (obj.YYYY) {
        returnObj.push(obj['YYYY'].slice(-2));
        returnObj.push(rozdilnyk2);
      }
    } else if (x === 'YYYY') {
      if (obj.YY) {
        if (obj.YY < 30) {
          obj['YY'] = '20' + obj.YY;
          returnObj.push(obj['YY']);
          returnObj.push(rozdilnyk2);
        } else {
          obj['YY'] = '19' + obj.YY;
          returnObj.push(obj['YY']);
          returnObj.push(rozdilnyk2);
        }
      }

      if (obj.YYYY) {
        returnObj.push(obj['YYYY']);
        returnObj.push(rozdilnyk2);
      }
    } else {
      returnObj.push(obj[x]);
      returnObj.push(rozdilnyk2);
    }
  }

  const str = returnObj.slice(0, -1).join('');

  return str;
}

module.exports = formatDate;
