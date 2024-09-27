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
  const dateComponents = date.split(separator);

  const originalDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    originalDate[fromFormat[i]] = dateComponents[i];
  }

  if (fromFormat.includes('YYYY')) {
    originalDate['YY'] = originalDate['YYYY'].slice(-2);
  } else if (fromFormat.includes('YY')) {
    const year = parseInt(originalDate['YY']);

    originalDate['YYYY'] = year < 30
      ? `20${originalDate['YY']}` : `19${originalDate['YY']}`;
  }

  const newDateComponents = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateComponents.push(originalDate[toFormat[i]]);
  }

  const formattedDate = newDateComponents.join(toFormat[toFormat.length - 1]);

  return formattedDate;
}

module.exports = formatDate;
