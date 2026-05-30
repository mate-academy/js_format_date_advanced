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
  const obj = {};

  for (let i = 0; i <= 2; i++) {
    obj[fromFormat[i]] = dateParts[i];
  }

  if ('YYYY' in obj && toFormat[0].length === toFormat[2].length) {
    obj['YYYY'] = obj['YYYY'].slice(-2);
  } else if (+obj['YY'] < 30) {
    obj['YY'] = '20' + obj['YY'];
  } else {
    obj['YY'] = '19' + obj['YY'];
  }

  const toDateParts = [];

  for (let i = 0; i <= 2; i++) {
    switch (toFormat[i]) {
      case 'DD':
        toDateParts[i] = obj['DD'];
        break;
      case 'MM':
        toDateParts[i] = obj['MM'];
        break;
      case 'YYYY':
      case 'YY':
        toDateParts[i] = obj['YYYY'] || obj['YY'];
        break;
    }
  }

  return toDateParts.join(toSeparator);
}

module.exports = formatDate;
