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
  const partsOfOldDate = date.split(fromFormat[fromFormat.length - 1]);
  const newSeparator = toFormat[toFormat.length - 1];

  const currentDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        currentDate.yearYYYY = partsOfOldDate[i];
        currentDate.yearYY = partsOfOldDate[i][2] + partsOfOldDate[i][3];
        break;

      case 'YY':
        currentDate.yearYY = partsOfOldDate[i];

        if (+partsOfOldDate[i] < 30) {
          currentDate.yearYYYY = `20${partsOfOldDate[i]}`;
        } else {
          currentDate.yearYYYY = `19${partsOfOldDate[i]}`;
        }
        break;

      case 'MM':
        currentDate.month = partsOfOldDate[i];
        break;

      case 'DD':
        currentDate.day = partsOfOldDate[i];
        break;

      default:
        break;
    }
  }

  const newFormatCurrentDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        newFormatCurrentDate.push(currentDate.yearYYYY);
        break;

      case 'YY':
        newFormatCurrentDate.push(currentDate.yearYY);
        break;

      case 'MM':
        newFormatCurrentDate.push(currentDate.month);
        break;

      case 'DD':
        newFormatCurrentDate.push(currentDate.day);
        break;

      default:
        break;
    }
  }

  return newFormatCurrentDate.join(newSeparator);
}

module.exports = formatDate;
