'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YYYY' && dateParts[i].length === 2) {
      dateParts[i] = parseInt(dateParts[i]) < 30
        ? '20' + dateParts[i] : '19' + dateParts[i];
    }

    if (fromFormat[i] === 'YY' && dateParts[i].length === 4) {
      dateParts[i] = dateParts[i].slice(2);
    }
    dateObj[fromFormat[i]] = dateParts[i];
  }

  return toFormat.slice(0, -1).map(format => {
    if (format === 'YYYY' && dateObj['YY']
    && dateObj['YY'].length === 2) {
      return parseInt(dateObj['YY']) < 30
        ? '20' + dateObj['YY'] : '19' + dateObj['YY'];
    }

    if (format === 'YY' && dateObj['YYYY'] && dateObj['YYYY'].length === 4) {
      return dateObj['YYYY'].slice(2);
    }

    return dateObj[format];
  }).join(toFormat[3]);
}

module.exports = formatDate;
