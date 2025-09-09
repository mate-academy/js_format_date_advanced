'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = '';
  const splitDate = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const dateObject = {};

  for (let i = 0; i < splitDate.length; i++) {
    dateObject[fromFormat[i]] = splitDate[i];
  }

  const temporaryArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' && fromFormat.includes('YYYY')) {
      temporaryArray.push(dateObject['YYYY'].slice(2));
    } else if (toFormat[i] === 'YYYY' && fromFormat.includes('YY')) {
      if (Number(dateObject['YY']) < 30) {
        temporaryArray.push(`20${dateObject['YY']}`);
      } else {
        temporaryArray.push(`19${dateObject['YY']}`);
      }
    } else {
      temporaryArray.push(dateObject[toFormat[i]]);
    }
  }

  result = temporaryArray.join(`${toFormat[toFormat.length - 1]}`);

  return result;
}

module.exports = formatDate;
