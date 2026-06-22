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
  const toSeparator = toFormat[toFormat.length - 1];

  const dateParts = date.split(fromSeparator);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  let fullYear = dateMap.YYYY || dateMap.YY;

  if (fullYear.length === 2) {
    fullYear = Number(fullYear) < 30 ? '20' + fullYear : '19' + fullYear;
  }

  const resultParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const currentFormat = toFormat[i];

    if (currentFormat === 'YYYY') {
      resultParts.push(fullYear);
    } else if (currentFormat === 'YY') {
      resultParts.push(fullYear.slice(-2));
    } else {
      resultParts.push(dateMap[currentFormat]);
    }
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
