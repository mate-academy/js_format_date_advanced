'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);

  let year;
  let month;
  let day;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = parts[i];

      if (fromFormat[i] === 'YY') {
        const number = Number(year);

        year = number < 30 ? `20${year}` : `19${year}`;
      }
    }

    if (fromFormat[i] === 'MM') {
      month = parts[i];
    }

    if (fromFormat[i] === 'DD') {
      day = parts[i];
    }
  }

  let result = '';

  for (let i = 0; i < 3; i++) {
    if (i > 0) {
      result += toFormat[3];
    }

    switch (toFormat[i]) {
      case 'YYYY':
        result += year;
        break;

      case 'YY':
        result += year.slice(-2);
        break;

      case 'MM':
        result += month;
        break;

      case 'DD':
        result += day;
        break;

      default:
        break;
    }
  }

  return result;
}

module.exports = formatDate;
