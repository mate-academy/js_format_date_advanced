'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[fromFormat.length - 1]);
  let year, month, day, separator;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const format = fromFormat[i];
    const part = parts[i];

    if (format === 'YYYY') {
      year = parseInt(part);
    } else if (format === 'YY') {
      year = parseInt(part) + (parseInt(part) < 30 ? 2000 : 1900);
    } else if (format === 'MM') {
      month = part;
    } else if (format === 'DD') {
      day = part;
    }
  }

  let formattedYear;

  if (toFormat.includes('YYYY')) {
    formattedYear = year.toString().padStart(4, '0');
  } else {
    formattedYear = year.toString().slice(-2);
  }

  const formattedMonth = month.padStart(2, '0');
  const formattedDay = day.padStart(2, '0');

  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    const format = toFormat[i];

    if (format === 'YYYY') {
      formattedDateParts.push(formattedYear);
    } else if (format === 'YY') {
      formattedDateParts.push(formattedYear.slice(-2));
    } else if (format === 'MM') {
      formattedDateParts.push(formattedMonth);
    } else if (format === 'DD') {
      formattedDateParts.push(formattedDay);
    } else {
      separator = format;
    }
  }

  return formattedDateParts.join(separator.toString());
}

module.exports = formatDate;
