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

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        dateObj.year = dateParts[i];
        break;

      case 'MM':
        dateObj.MM = dateParts[i];
        break;

      case 'DD':
        dateObj.DD = dateParts[i];
        break;

      default:
        break;
    }
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateObj.year = parseInt(dateObj.year) < 30
      ? '20' + dateObj.year
      : '19' + dateObj.year;
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj.year = dateObj.year.slice(-2);
  }

  const newDateParts = [];

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        newDateParts.push(dateObj.year);
        break;

      case 'MM':
        newDateParts.push(dateObj.MM);
        break;

      case 'DD':
        newDateParts.push(dateObj.DD);
        break;

      default:
        break;
    }
  }

  return newDateParts.join(toFormat[3]);
}

module.exports = formatDate;
