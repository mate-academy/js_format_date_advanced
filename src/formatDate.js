'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const dateParts = date.split(separator);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  const resultParts = [];

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year =
      Number(dateMap['YY']) < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;

    dateMap['YYYY'] = year;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultParts.push(dateMap[toFormat[i]]);
  }

  return resultParts.join(toFormat[3]);
}

module.exports = formatDate;
