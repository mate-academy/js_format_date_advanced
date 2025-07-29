'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const fromFormatParts = fromFormat.slice(0, 3); // e.g., ['YY', 'MM', 'DD']
  const toFormatParts = toFormat.slice(0, 3);
  const dateParts = date.split(oldSeparator);
  const dateMap = {};

  fromFormatParts.forEach((part, i) => {
    dateMap[part] = dateParts[i];
  });

  const newDateParts = toFormatParts.map((part) => {
    if (part === 'YYYY' && fromFormatParts.includes('YY')) {
      const yy = +dateMap['YY'];

      return yy < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
    }

    if (part === 'YY' && fromFormatParts.includes('YYYY')) {
      return dateMap['YYYY'].slice(-2);
    }

    return dateMap[part];
  });

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
