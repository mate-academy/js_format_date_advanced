'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(fromFormat[fromFormat.length - 1]);
  let year;
  let month;
  let day;
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = arrDate[i];
        break;
      case 'MM':
        month = arrDate[i];
        break;
      case 'DD':
        day = arrDate[i];
        break;
      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
          year = year.slice(2);
        }

        if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
          if (year < 30) {
            year = `20${year}`;
          } else {
            year = `19${year}`;
          }
        }
        newDate.push(year);
        break;
      case 'MM':
        newDate.push(month);
        break;
      case 'DD':
        newDate.push(day);
        break;
      default:
        break;
    }
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
