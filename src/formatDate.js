'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  if (!date) {
    return {};
  }

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const parts = date.split(fromSeparator);
  const dateObj = {};

  for (let i = 0; i < parts.length; i++) {
    dateObj[fromFormat[i]] = parts[i];
  }

  const currentYear = dateObj['YYYY'] || dateObj['YY'];
  let fullYear, shortYear;

  if (currentYear.length === 4) {
    fullYear = currentYear;
    shortYear = currentYear.slice(-2);
  } else {
    fullYear = +currentYear < 30 ? '20' + currentYear : '19' + currentYear;
    shortYear = currentYear;
  }

  dateObj['YYYY'] = fullYear;
  dateObj['YY'] = shortYear;

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const key = toFormat[i];

    resultParts.push(dateObj[key]);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
