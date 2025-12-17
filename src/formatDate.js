'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const sepForm = fromFormat[3];
  const values = date.split(sepForm);
  const parts = {};

  for (let i = 0; i < 3; i++) {
    parts[fromFormat[i]] = values[i];
  }

  if (parts['YY']) {
    parts['YYYY'] = (Number(parts['YY']) < 30 ? '20' : '19') + parts['YY'];
  }

  if (parts['YYYY']) {
    parts['YY'] = parts['YYYY'].slice(-2);
  }

  const sepTo = toFormat[3];

  return toFormat
    .slice(0, 3)
    .map((p) => parts[p])
    .join(sepTo);
}

module.exports = formatDate;
