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
  const dateParts = date.split(oldSeparator);
  let year = '';
  let month = '';
  let day = '';
  const formatDateParts = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i][0]) {
      case 'Y':
        year = dateParts[i];
        break;
      case 'M':
        month = dateParts[i];
        break;
      case 'D':
        day = dateParts[i];
        break;
      default:
        throw new Error('not correct format');
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i][0]) {
      case 'Y':
        formatDateParts.push(getFormatYear(year, toFormat[i]));
        break;
      case 'M':
        formatDateParts.push(month);
        break;
      case 'D':
        formatDateParts.push(day);
        break;
      default:
        throw new Error('not correct format');
    }
  }

  return formatDateParts.join(newSeparator);
}

/**
 * @param {string} year
 * @param {string} formatYear
 *
 * @returns {string}
 */

function getFormatYear(year, formatYear) {
  if (formatYear.length === year.length) {
    return year;
  }

  if (formatYear.length === 2) {
    return year.slice(-2);
  }

  if (year < 30) {
    return `20${year}`;
  }

  return `19${year}`;
}

module.exports = formatDate;
