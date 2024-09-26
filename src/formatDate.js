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
  const numbers = date.split(fromFormat[3]);
  const oldArr = {};
  const newArr = [];

  for (let i = 0; i < numbers.length; i++) {
    oldArr[fromFormat[i]] = numbers[i];
  }

  if ('YY' in oldArr) {
    oldArr.YYYY = oldArr.YY < 30 ? '20' + oldArr.YY : '19' + oldArr.YY;
  }

  for (let i = 0; i < numbers.length; i++) {
    switch (toFormat[i]) {
      case 'DD': newArr[i] = oldArr.DD;
        break;
      case 'MM': newArr[i] = oldArr.MM;
        break;
      case 'YYYY': newArr[i] = oldArr.YYYY;
        break;
      case 'YY': newArr[i] = oldArr.YY ? oldArr.YY : oldArr.YYYY.slice(2);
        break;
    }
  }

  const result = newArr.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
