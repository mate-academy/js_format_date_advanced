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

  const parts = date.split(fromSeparator);

  let year, month, day;

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      day = parts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = parts[i];
    }

    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = parts[i];
    }
  }

  // Конвертация года
  if (toFormat.includes('YY') && year.length === 4) {
    year = year.slice(2);
  }

  if (toFormat.includes('YYYY') && year.length === 2) {
    const num = Number(year);

    year = num < 30 ? '20' + year : '19' + year;
  }

  const result = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      result.push(day);
    }

    if (toFormat[i] === 'MM') {
      result.push(month);
    }

    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      result.push(year);
    }
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
