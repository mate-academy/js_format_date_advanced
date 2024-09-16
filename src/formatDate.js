'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);
  const currentFormat = {};
  const neededFormat = {};
  const formatedDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    currentFormat[fromFormat[i]] = splitedDate[i];
    neededFormat[toFormat[i]] = 0;
  }

  if (currentFormat.hasOwnProperty('YY')
        && neededFormat.hasOwnProperty('YYYY')) {
    if (currentFormat['YY'] < 30) {
      currentFormat['YYYY'] = '20' + currentFormat['YY'];
    } else {
      currentFormat['YYYY'] = '19' + currentFormat['YY'];
    }
  }

  if (currentFormat.hasOwnProperty('YYYY')
      && neededFormat.hasOwnProperty('YY')) {
    currentFormat['YY'] = currentFormat['YYYY'] % 100;
  }

  for (const prop in neededFormat) {
    neededFormat[prop] = currentFormat[prop];
    formatedDate.push(neededFormat[prop]);
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
