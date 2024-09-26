'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateArr = date.split(fromFormat[3]);
  let YYYY = 0;
  let MM = 0;
  let DD = 0;
  let YY = 0;
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        YYYY = oldDateArr[i];
        break;

      case 'YY':
        YY = oldDateArr[i];
        break;

      case 'MM':
        MM = oldDateArr[i];
        break;

      case 'DD':
        DD = oldDateArr[i];
        break;

      default:
        break;
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY') && YY < 30) {
    YYYY = '20' + YY;
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY') && YY >= 30) {
    YYYY = '19' + YY;
  }

  for (const i of toFormat) {
    switch (i) {
      case 'YYYY':
        newDate.push(YYYY);
        break;

      case 'YY':
        if (fromFormat.includes('YY')) {
          newDate.push(YY);
        }
        newDate.push(YYYY.substring(2));
        break;

      case 'MM':
        newDate.push(MM);
        break;

      case 'DD':
        newDate.push(DD);
        break;

      default:
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
