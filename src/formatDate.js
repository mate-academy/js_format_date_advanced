'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const dateObj = {};
  const tempArray = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        dateObj.year = dateArray[i];
        break;
      case 'YY':
        dateObj.year = dateArray[i];
        break;
      case 'MM':
        dateObj.month = dateArray[i];
        break;
      case 'DD':
        dateObj.day = dateArray[i];
        break;
      default:

        break;
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj.year = dateObj.year.slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateObj.year < 30) {
      dateObj.year = '20' + dateObj.year;
    } else {
      dateObj.year = '19' + dateObj.year;
    }
  }

  for (const char of toFormat) {
    switch (char) {
      case 'YYYY':
        tempArray.push(dateObj.year);
        break;
      case 'YY':
        tempArray.push(dateObj.year);
        break;
      case 'MM':
        tempArray.push(dateObj.month);
        break;
      case 'DD':
        tempArray.push(dateObj.day);
        break;
      default:

        break;
    }
  }

  const result = tempArray.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
