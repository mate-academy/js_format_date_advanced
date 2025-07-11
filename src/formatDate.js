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
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  const resultParts = toFormat.slice(0, 3).map((format) => {
    if (format === 'YY') {
      const fullYear = dateMap['YYYY'];

      if (fullYear) {
        return fullYear.slice(-2);
      }

      const shortYear = dateMap['YY'];

      return shortYear;
    }

    if (format === 'YYYY') {
      const shortYear = dateMap['YY'];

      if (shortYear) {
        const num = Number(shortYear);

        return num < 30 ? '20' + shortYear : '19' + shortYear;
      }

      return dateMap['YYYY'];
    }

    return dateMap[format];
  });

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
