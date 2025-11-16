'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(dateStr, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];

  const fromParts = fromFormat.slice(0, -1);
  const toParts = toFormat.slice(0, -1);

  // Split the input date by the old separator
  const dateValues = dateStr.split(fromSeparator);

  // Map from format keys to actual values
  const dateMap = {};
  fromParts.forEach((part, i) => {
    dateMap[part] = dateValues[i];
  });

  // Build new date string based on toFormat
  const newDateParts = toParts.map((part) => {
    if (part === 'YY') {
      const year = dateMap['YYYY'] ?? dateMap['YY'];
      if (year.length === 4) return year.slice(-2); // YYYY -> YY
      return year; // already YY
    }
    if (part === 'YYYY') {
      let year = dateMap['YYYY'] ?? dateMap['YY'];
      if (year.length === 2) {
        year = parseInt(year, 10) < 30 ? '20' + year : '19' + year;
      }
      return year;
    }
    return dateMap[part];
  });

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
