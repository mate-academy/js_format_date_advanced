'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];
  let year = null;
  let day = null;
  let month = null;
  const newArr = date.split(separatorFrom);
  const resultArr = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = newArr[i];

        break;

      case 'MM':
        month = newArr[i];
        break;

      case 'YY':
        if (newArr[i] >= 30) {
          year = '19' + newArr[i];
        } else {
          year = '20' + newArr[i];
        }
        break;

      case 'DD':
        day = newArr[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'DD':
        resultArr[i] = day;
        break;

      case 'MM':
        resultArr[i] = month;
        break;

      case 'YY':
        resultArr[i] = year.slice(2);
        break;

      case 'YYYY':
        resultArr[i] = year;
        break;

      default:
        break;
    }
  }

  const resultStr = resultArr.join(separatorTo);

  return resultStr;
}

module.exports = formatDate;
