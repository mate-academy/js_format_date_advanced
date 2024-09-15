'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  const obj = {};
  let str = '';

  for (let i = 0; i < fromFormat.length; i++) {
    const element = fromFormat[i];

    obj[element] = dateArr[i];
  }

  for (const item of toFormat) {
    if (item === 'YY') {
      if (fromFormat.includes(item)) {
        str += obj.YY + separator;
      } else {
        const lastDate = obj.YYYY.slice(-2);

        str += lastDate + separator;
      }
    }

    if (item === 'YYYY') {
      if (fromFormat.includes(item)) {
        str += obj.YYYY + separator;
      } else {
        if (obj.YY < 30) {
          str += '20' + obj.YY + separator;
        } else {
          str += '19' + obj.YY + separator;
        }
      }
    }

    if (item === 'MM') {
      str += obj.MM + separator;
    }

    if (item === 'DD') {
      str += obj.DD + separator;
    }
  }

  const strDate = str.slice(0, -1);

  return strDate;
}
module.exports = formatDate;
