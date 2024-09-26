'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  const fromFormatObj = {};
  const toFormatObj = {};

  for (let i = 0; i < 3; i++) {
    fromFormatObj[fromFormat[i]] = dateParts[i];
  }

  for (const part of toFormat) {
    if (part === 'YY' && fromFormatObj['YYYY']) {
      toFormatObj[part] = fromFormatObj['YYYY'].slice(-2);
    } else if (part === 'YYYY' && fromFormatObj['YY']) {
      if (parseInt(fromFormatObj['YY']) < 30) {
        toFormatObj[part] = '20' + fromFormatObj['YY'];
      } else {
        toFormatObj[part] = '19' + fromFormatObj['YY'];
      }
    } else {
      toFormatObj[part] = fromFormatObj[part];
    }
  }

  const newDateParts = [toFormatObj[toFormat[0]],
    toFormatObj[toFormat[1]], toFormatObj[toFormat[2]]];

  return newDateParts.join(toFormat[3]);
}

module.exports = formatDate;
