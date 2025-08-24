'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(`${fromFormat[fromFormat.length - 1]}`);
  const objDate = {};

  for (let i = 0; i < dateParts.length; i++) {
    objDate[fromFormat[i]] = dateParts[i];
  }

  const newSeparator = `${toFormat[toFormat.length - 1]}`;
  const newDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' && objDate.YYYY) {
      newDateParts.push(objDate.YYYY.slice(-2));
    } else if (toFormat[i] === 'YYYY' && objDate.YY) {
      if (Number(objDate.YY) < 30) {
        newDateParts.push('20' + objDate.YY);
      } else {
        newDateParts.push('19' + objDate.YY);
      }
    } else {
      newDateParts.push(objDate[toFormat[i]]);
    }
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
