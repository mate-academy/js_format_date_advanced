'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , oldSeparator] = fromFormat;
  const oldDateArray = date.split(oldSeparator);
  const oldDateObject = {};
  const newDateArray = [];
  const newSeparator = toFormat[toFormat.length - 1];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    oldDateObject[fromFormat[i]] = oldDateArray[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      newDateArray.push(oldDateObject['DD']);
    } else if (toFormat[i] === 'MM') {
      newDateArray.push(oldDateObject['MM']);
    } else if (toFormat[i] === 'YYYY' && oldDateObject['YYYY']) {
      newDateArray.push(oldDateObject['YYYY']);
    } else if (toFormat[i] === 'YY' && oldDateObject['YY']) {
      newDateArray.push(oldDateObject['YY']);
    } else if (toFormat[i] === 'YYYY' && oldDateObject['YY'] < 30) {
      newDateArray.push('20' + oldDateObject['YY']);
    } else if (toFormat[i] === 'YYYY' && oldDateObject['YY'] >= 30) {
      newDateArray.push('19' + oldDateObject['YY']);
    } else if (toFormat[i] === 'YY' && oldDateObject['YYYY']) {
      newDateArray.push(oldDateObject['YYYY'].slice(2));
    }
  }

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
