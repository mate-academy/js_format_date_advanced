'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = toFormat[toFormat.length - 1];
  const parts = date.split(separator);
  const dateObj = {};
  let year = dateObj['YYYY'] || dateObj['YY'];

  for (let i = 0; i < parts.length; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  const targetYearFormat = toFormat.find((f) => f.includes('Y'));

  if (targetYearFormat === 'YY' && year.length === 4) {
    year = year.slice(-2);
  } else if (targetYearFormat === 'YYYY' && year.length === 2) {
    year = +year < 30 ? '20' + year : '19' + year;
  }
  dateObj['YYYY'] = year;
  dateObj['YY'] = year;

  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    resultParts.push(dateObj[key]);
  }

  return resultParts.join(separator);
}

module.exports = formatDate;
