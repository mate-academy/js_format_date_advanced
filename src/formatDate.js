'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat.at(-1);
  const toSeparator = toFormat.at(-1);
  const dateToArr = date.split(fromSeparator);

  const objDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDate[fromFormat[i]] = dateToArr[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    objDate['YY'] = objDate['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    objDate['YYYY'] = Number(objDate['YY']);

    if (objDate['YY'] < 30) {
      objDate['YYYY'] = '20' + objDate['YY'];
    } else {
      objDate['YYYY'] = '19' + objDate['YY'];
    }
  }

  const result = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    result.push(objDate[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
