'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = /[.\-/]/;
  const newDate = [];
  const objectDate = {};
  const splitDate = date.split(oldSeparator);
  const isPunctuation = (str) => /^[\p{P}\p{S}]+$/u.test(str);
  const punct = toFormat.filter(isPunctuation).join('');

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

  toFormat.forEach((value) => {
    newDate.push(objectDate[value]);
  });

  return newDate.join(punct).slice(0, -1);
}

module.exports = formatDate;
