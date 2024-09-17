'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const dateObj = {};

  fromFormat.slice(0, -1).forEach((format, index) => {
    dateObj[format] = dateParts[index];
  });

  let year = dateObj['YYYY'] || dateObj['YY'];
  const month = dateObj['MM'];
  const day = dateObj['DD'];

  if (year) {
    if (year.length === 4 && toFormat.includes('YY')) {
      year = year.slice(-2);
    } else if (year.length === 2) {
      if (toFormat.includes('YYYY') && year < 30) {
        year = '20' + year;
      } else if (toFormat.includes('YYYY')) {
        year = '19' + year;
      }
    }
  }

  const formattedDate = toFormat.slice(0, -1).map(format => {
    if (format === 'MM') {
      return month;
    } else if (format === 'YYYY' || format === 'YY') {
      return year;
    } else if (format === 'DD') {
      return day;
    }
  }).join(toFormat[toFormat.length - 1]);

  return formattedDate;
}

module.exports = formatDate;
