'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(/[/.-]/);

  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YY') {
      year = parseInt(dateParts[i]);

      if (year < 30) {
        year = 2000 + year;
      } else {
        year = 1900 + year;
      }
    } else if (fromFormat[i] === 'YYYY') {
      year = dateParts[i];
    } else if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    } else if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }
  }

  const formattedDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY') {
      const shortYear = year % 100;

      formattedDate[i] = shortYear;
    } else if (toFormat[i] === 'YYYY') {
      formattedDate[i] = year;
    } else if (toFormat[i] === 'MM') {
      formattedDate[i] = month;
    } else if (toFormat[i] === 'DD') {
      formattedDate[i] = day;
    } else {
    }
  }

  const separator = toFormat[3];
  const result = formattedDate.join(separator);

  return result;
}

module.exports = formatDate;
