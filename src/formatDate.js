'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newDate = [];
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const divideDate = date.split(oldSeparator);
  const dateMap = {};

  for (let i = 0; i < divideDate.length; i++) {
    dateMap[fromFormat[i]] = divideDate[i];
  }

  if (!dateMap['YY']) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (!dateMap['YYYY']) {
    dateMap['YYYY'] = +dateMap['YY'] >= 30
      ? `19${dateMap['YY']}`
      : `20${dateMap['YY']}`;
  }

  for (const format of toFormat) {
    newDate.push(dateMap[format]);
  }
  newDate.length -= 1;

  return newDate.join(newSeparator);
}

module.exports = formatDate;
