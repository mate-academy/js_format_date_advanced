'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const parts = date.split(fromSeparator);

  const dateParts = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  function convertYear(value, from, to) {
    if (from === to) {
      return value;
    }

    if (from === 'YYYY' && to === 'YY') {
      return value.slice(-2);
    }

    if (from === 'YY' && to === 'YYYY') {
      const num = parseInt(value, 10);

      if (num < 30) {
        return '20' + (num < 10 ? '0' + num : num);
      } else {
        return '19' + value;
      }
    }

    return value;
  }

  const toSeparator = toFormat[toFormat.length - 1];
  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const partKey = toFormat[i];

    if (partKey === 'YYYY' || partKey === 'YY') {
      const fromYearKey = dateParts['YYYY'] ? 'YYYY' : 'YY';
      const fromYearValue = dateParts['YYYY'] || dateParts['YY'];
      const convertedYear = convertYear(fromYearValue, fromYearKey, partKey);

      resultParts.push(convertedYear);
    } else {
      resultParts.push(dateParts[partKey]);
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
