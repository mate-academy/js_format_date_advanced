'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const partsOfDate = date.split(fromFormat[3]);
  const result = [];
  let day = '';
  let month = '';
  let year = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        year = partsOfDate[i];
        break;

      case 'YYYY':
        year = partsOfDate[i];
        break;

      case 'MM':
        month = partsOfDate[i];
        break;

      case 'DD':
        day = partsOfDate[i];
        break;

      default:
        return 'Unexpected type';
    }
  }

  for (const data of toFormat.slice(0, -1)) {
    switch (data) {
      case 'YY':
        if (year.length !== 2) {
          year %= 100;
        }

        result.push(year);
        break;

      case 'YYYY':
        if (year.length !== 4 && year % 100 >= 30) {
          year = +year + 1900;
        }

        if (year.length !== 4 && year % 100 < 30) {
          year = +year + 2000;
        }

        result.push(year);
        break;

      case 'MM':
        result.push(month);
        break;

      case 'DD':
        result.push(day);
        break;

      default:
        return 'Unexpected type';
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
