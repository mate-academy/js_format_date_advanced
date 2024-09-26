'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);

  let year;
  let month;
  let day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      year = dateParts[i];
    }

    if (fromFormat[i] === 'YY') {
      year = dateParts[i];

      if (year < 30) {
        year = '20' + year;
      } else {
        year = '19' + year;
      }
    }

    if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    }

    if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }
  }

  const separator = toFormat[toFormat.length - 1];
  const newToFormat = toFormat.slice(0, -1);

  const newDateFormat = newToFormat.map((format) => {
    if (format === 'YYYY') {
      return year;
    }

    if (format === 'YY') {
      return year.slice(-2);
    }

    if (format === 'MM') {
      return month;
    }

    if (format === 'DD') {
      return day;
    } else {
      return '';
    }
  });

  return newDateFormat.join(separator);
}

module.exports = formatDate;
