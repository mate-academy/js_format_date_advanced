'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const dateParts = dateStr.split(separator);

  const date = {};

  fromFormat.slice(0, 3).forEach((format, index) => {
    if (format === 'YYYY' || format === 'YY') {
      date.year = dateParts[index];
    } else if (format === 'MM') {
      date.month = dateParts[index];
    } else if (format === 'DD') {
      date.day = dateParts[index];
    }
  });

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    date.year = date.year.slice(-2);
  } else if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(date.year, 10);

    date.year = year < 30 ? `20${date.year}` : `19${date.year}`;
  }

  const newDateParts = toFormat.slice(0, 3).map((format) => {
    if (format === 'YYYY' || format === 'YY') {
      return date.year;
    } else if (format === 'MM') {
      return date.month;
    } else if (format === 'DD') {
      return date.day;
    }
  });

  const newSeparator = toFormat[3];

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
