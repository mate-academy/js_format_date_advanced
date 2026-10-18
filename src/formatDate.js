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
  const values = date.split(separator);
  const parts = {};

  for (let i = 0; i < values.length; i++) {
    parts[fromFormat[i]] = values[i];
  }

  const total = [];
  const newSeparator = toFormat[toFormat.length - 1];
  const year = Object.keys(parts).find((key) => key.includes('Y'));
  const yearVal = parts[year];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('Y')) {
      if (toFormat[i] === 'YY') {
        total.push(yearVal.slice(-2));
      } else {
        const lastTwo = yearVal.slice(-2);

        if (Number(lastTwo) < 30) {
          total.push('20' + lastTwo);
        } else {
          total.push('19' + lastTwo);
        }
      }
    } else {
      total.push(parts[toFormat[i]]);
    }
  }

  return total.join(newSeparator);
}

module.exports = formatDate;
