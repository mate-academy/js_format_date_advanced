'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const sep = fromFormat[fromFormat.length - 1];
  const obj = {};
  const a = [];

  function convertDigits() {
    if ('YYYY' in obj) {
      obj['YY'] = obj['YYYY'].slice(2);
      delete obj['YYYY'];

      return;
    }

    if ('YY' in obj) {
      obj['YYYY'] = obj['YY'] < 30 ? '20' + obj['YY'] : '19' + obj['YY'];
      delete obj['YY'];
    }
  }

  const splitArray = date.split(sep);

  for (let i = 0; i < splitArray.length; i++) {
    obj[fromFormat[i]] = splitArray[i];
  }

  if (
    (fromFormat.includes('YYYY') && toFormat.includes('YY')) ||
    (fromFormat.includes('YY') && toFormat.includes('YYYY'))
  ) {
    convertDigits();
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    a.push(obj[toFormat[i]]);
  }

  return a.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
