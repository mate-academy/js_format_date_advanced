'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const arrDate = date.split(oldSeparator);

  const result = [];
  let year, month, day, oldYearFormat;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case ('YY'):
        oldYearFormat = 2;
        year = arrDate[i];
        break;

      case ('YYYY'):
        oldYearFormat = 4;
        year = arrDate[i];
        break;

      case ('MM'):
        month = arrDate[i];
        break;

      case ('DD'):
        day = arrDate[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case ('YY'):
        if (oldYearFormat === 4) {
          year = year.slice(-2);
        }
        result.push(year);
        break;

      case ('YYYY'):
        if (oldYearFormat === 2 && year < 30) {
          year = '20' + year;
        } else if (oldYearFormat === 2 && year >= 30) {
          year = '19' + year;
        }
        result.push(year);
        break;

      case ('MM'):
        result.push(month);
        break;

      case ('DD'):
        result.push(day);
        break;

      default:
        break;
    }
  }

  return result.join(newSeparator);
}

module.exports = formatDate;
