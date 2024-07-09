'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const symbolFormat = fromFormat[fromFormat.length - 1];
  const symbolTo = toFormat[toFormat.length - 1];
  const dateParts = date.split(symbolFormat);
  let year;
  let day;
  let month;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        year = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'DD':
        day = dateParts[i];
        break;
      default:
        throw new Error(`Unknown date format: ${fromFormat[i]}`);
    }
  }

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (year.length === 2) {
          parseInt(year, 10);

          if (year < 30) {
            newDate.push('20' + year);
          } else {
            newDate.push('19' + year);
          }
        } else {
          newDate.push(year);
        }
        break;
      case 'YY':
        if (year.length === 4) {
          newDate.push(year.slice(-2));
        } else {
          newDate.push(year);
        }
        break;
      case 'MM':
        newDate.push(month);
        break;
      case 'DD':
        newDate.push(day);
        break;
      default:
        throw new Error(`Unknown date format: ${toFormat[i]}`);
    }
  }

  return newDate.join(symbolTo);
}
module.exports = formatDate;
