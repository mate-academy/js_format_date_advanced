'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.slice(3);
  const newSeparator = toFormat.slice(3);
  const splitDate = date.split(oldSeparator);

  const newDate = [];
  const objectDate = {};

  for (let i = 0; i < splitDate.length; i++) {
    objectDate[fromFormat[i]] = splitDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (objectDate['YY'] < 30) {
      objectDate['YYYY'] = '20' + objectDate['YY'];
    } else {
      objectDate['YYYY'] = '19' + objectDate['YY'];
    }
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    objectDate['YY'] = objectDate['YYYY'].slice(-2);
  }

  for (let i = 0; i < splitDate.length; i++) {
    newDate[i] = objectDate[toFormat[i]];
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
