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
  const dateParts = date.split(fromFormat[3]);
  let day, month, year;
  const result = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = dateParts[i];
        break;
      case 'YY':
        year = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'DD':
        day = dateParts[i];
        break;
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (year.length === 2) {
          year = +year < 30 ? '20' + year : '19' + year;
        }
        result.push(year);
        break;
      case 'YY':
        result.push(year.slice(-2));
        break;
      case 'MM':
        result.push(month);
        break;
      case 'DD':
        result.push(day);
        break;
    }
  }

  const res = result.join(toFormat[3]);

  return res;
}

module.exports = formatDate;
