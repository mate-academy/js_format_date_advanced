'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const separator = date.includes('-') ? '-' : date.includes('.') ? '.' : '/';
  const parts = date.split(separator);

  const dateIndex = fromFormat.indexOf('DD');
  const monthIndex = fromFormat.indexOf('MM');
  const yearIndex =
    fromFormat.indexOf('YY') !== -1
      ? fromFormat.indexOf('YY')
      : fromFormat.indexOf('YYYY');

  const day = parts[dateIndex];
  const month = parts[monthIndex];
  let year = parts[yearIndex];

  if (fromFormat.includes('YY') && year.length === 2) {
    year = parseInt(year, 10);
    year = year < 30 ? 2000 + year : 1900 + year;
  } else if (toFormat.includes('YY') && year.length === 4) {
    year = year.toString().slice(-2);
  }

  let newSeparator = separator;

  for (const part of toFormat) {
    if (part.includes('-')) {
      newSeparator = '-';
      break;
    }

    if (part.includes('/')) {
      newSeparator = '/';
    }

    if (part.includes('.')) {
      newSeparator = '.';
      break;
    }
  }

  for (const format of toFormat) {
    if (format === 'DD') {
      result.push(day);
    }

    if (format === 'MM') {
      result.push(month);
    }

    if (format === 'YY' || format === 'YYYY') {
      result.push(year);
    }
  }

  const newDate = result.join(newSeparator);

  return newDate;
}

module.exports = formatDate;
