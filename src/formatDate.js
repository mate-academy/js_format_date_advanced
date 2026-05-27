'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const parts = date.split(fromFormat[3]);
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (dateMap['YYYY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (dateMap['YY']) {
    const yy = Number(dateMap['YY']);
    dateMap['YYYY'] = yy < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }

  return toFormat
    .slice(0, 3)
    .map(key => dateMap[key])
    .join(toFormat[3]);
}

module.exports = formatDate;
