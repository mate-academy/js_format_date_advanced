'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [fromSeparator, toSeparator] = [fromFormat[3], toFormat[3]];
  const dateParts = date.split(fromSeparator);
  const values = {};

  for (let i = 0; i < 3; i++) {
    values[fromFormat[i]] = dateParts[i];
  }

  const result = [];

  if ('YY' in values) {
    values.YYYY = expandYear(values.YY);
  } else {
    values.YY = values.YYYY.slice(-2);
  }

  for (let i = 0; i < 3; i++) {
    result.push(values[toFormat[i]]);
  }

  return result.join(toSeparator);
}

function expandYear(year) {
  const century = Number(year) < 30 ? '20' : 19;

  return century + year;
}

module.exports = formatDate;
