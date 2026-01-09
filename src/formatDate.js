'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newDate = date.split(separator);
  const supObj = {};
  const newArr = [];

  for (let i = 0; i < 3; i++) {
    supObj[fromFormat[i]] = newDate[i];
  }

  for (const key of toFormat) {
    if (key in supObj) {
      newArr.push(supObj[key]);
    } else if (key === 'YYYY' && 'YY' in supObj) {
      const yearNum = +supObj['YY'];
      const newFormatYear =
        yearNum < 30 ? '20' + supObj['YY'] : '19' + supObj['YY'];

      newArr.push(newFormatYear);
    } else if (key === 'YY' && 'YYYY' in supObj) {
      newArr.push(supObj['YYYY'].slice(-2));
    }
  }

  return newArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
