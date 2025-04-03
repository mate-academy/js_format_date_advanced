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

  const dateParts = date.split(fromSeparator);

  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (dateMap['YY'] && !dateMap['YYYY']) {
    const year = parseInt(dateMap['YY']);

    dateMap['YYYY'] = (year < 30 ? '20' : '19') + dateMap['YY'];
  } else if (dateMap['YYYY'] && !dateMap['YY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const newSeparator = toFormat[toFormat.length - 1];
  const formattedParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const format = toFormat[i];

    formattedParts.push(dateMap[format]);
  }

  return formattedParts.join(newSeparator);
}

module.exports = formatDate;
