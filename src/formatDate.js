'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayDate = date.split(fromFormat[fromFormat.length - 1]);
  const newSplit = toFormat[toFormat.length - 1];
  const oldFormat = {};
  const newFormat = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldFormat[fromFormat[i]] = arrayDate[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    oldFormat['YY'] = oldFormat['YYYY'].slice(-2);
    delete oldFormat['YYYY'];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (Number(oldFormat['YY']) < 30) {
      oldFormat['YYYY'] = '20' + oldFormat['YY'];
    } else {
      oldFormat['YYYY'] = '19' + oldFormat['YY'];
    }
  }

  for (const keys of Object.keys(oldFormat)) {
    newFormat[toFormat.indexOf(keys)] = oldFormat[keys];
  }

  return newFormat.join(newSplit);
}

module.exports = formatDate;
