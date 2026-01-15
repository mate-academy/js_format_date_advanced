'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separator);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  for (const key of Object.keys(dateMap)) {
    if (key === 'YYYY') {
      dateMap['YY'] = dateMap[key].slice(-2);
    }

    if (key === 'YY') {
      const year = +dateMap[key];

      if (year < 30) {
        dateMap['YYYY'] = `20${dateMap[key]}`;
      } else {
        dateMap['YYYY'] = `19${dateMap[key]}`;
      }
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(dateMap[toFormat[i]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
