'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDateFormatSeparator = fromFormat[fromFormat.length - 1];
  const toDateFormatSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromDateFormatSeparator);
  const dateFormatted = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      const day = dateParts[i];

      dateFormatted[toFormat.indexOf('DD')] = day;
    }

    if (fromFormat[i] === 'MM') {
      const month = dateParts[i];

      dateFormatted[toFormat.indexOf('MM')] = month;
    }

    if (fromFormat[i] === 'YYYY') {
      const year = dateParts[i];

      if (toFormat.indexOf('YYYY') !== -1) {
        dateFormatted[toFormat.indexOf('YYYY')] = year;
      }

      dateFormatted[toFormat.indexOf('YY')] = year.slice(2);
    }

    if (fromFormat[i] === 'YY') {
      const year = dateParts[i];

      if (toFormat.indexOf('YY') !== -1) {
        dateFormatted[toFormat.indexOf('YY')] = year;
      }

      const yearPrefix = year < 30
        ? '20'
        : '19';

      dateFormatted[toFormat.indexOf('YYYY')] = yearPrefix + year;
    }
  }

  return dateFormatted.join(toDateFormatSeparator);
}

module.exports = formatDate;
