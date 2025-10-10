'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const delimeter = fromFormat[fromFormat.length - 1];
  const newDelimeter = toFormat[toFormat.length - 1];

  const dateParts = date.split(delimeter);

  const objDate = {};

  const resultParts = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objDate[fromFormat[i]] = dateParts[i];
  }

  if (
    fromFormat.includes('YYYY') &&
    toFormat.includes('YY') &&
    !toFormat.includes('YYYY')
  ) {
    objDate['YY'] = objDate['YYYY'].slice(-2);
  }

  if (
    fromFormat.includes('YY') &&
    !fromFormat.includes('YYYY') &&
    toFormat.includes('YYYY')
  ) {
    if (Number(objDate['YY']) < 30) {
      objDate['YYYY'] = '20' + objDate['YY'];
    } else {
      objDate['YYYY'] = '19' + objDate['YY'];
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultParts.push(objDate[toFormat[i]]);
  }

  return resultParts.join(newDelimeter);
}

module.exports = formatDate;
