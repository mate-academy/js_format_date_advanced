'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  let day = null;
  let month = null;
  let year = null;

  const dateParts = date.split(fromSeparator);
  const result = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'YY':
      case 'YYYY':
        year = dateParts[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        result[i] = day;
        break;
      case 'MM':
        result[i] = month;
        break;
      case 'YY':
      case 'YYYY':
        if (toFormat[i].length === year.length) {
          result[i] = year;
        }

        if (toFormat[i].length === 2 && year.length === 4) {
          result[i] = year.slice(-2);
        }

        if (year.length === 2) {
          if (+year < 30) {
            result[i] = +year + 2000;
          }

          if (+year >= 30) {
            result[i] = +year + 1900;
          }
        }
        break;
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
