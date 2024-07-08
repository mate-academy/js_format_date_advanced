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
  const dateSeparated = date.split(fromFormat[3]);
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        year = dateSeparated[i];
        break;
      case 'MM':
        month = dateSeparated[i];
        break;
      case 'DD':
        day = dateSeparated[i];
        break;
    }
  }

  let finalDate = '';

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'MM':
        finalDate += month;
        break;
      case 'DD':
        finalDate += day;
        break;
      case 'YY':
        finalDate += year.slice(-2);
        break;
      case 'YYYY':
        if (year.length === 4) {
          finalDate += year;
        } else {
          if (Number.isFinite(parseInt(year)) && parseInt(year) < 30) {
            finalDate += '20' + year;
          } else {
            finalDate += '19' + year;
          }
        }
        break;
    }

    if (i < 2) {
      finalDate += toFormat[3];
    }
  }

  return finalDate;
}

module.exports = formatDate;
