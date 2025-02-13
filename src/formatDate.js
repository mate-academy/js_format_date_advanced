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
  const fromParts = fromFormat.slice(0, fromFormat.length - 1);

  const dateObject = {};

  for (let i = 0; i < fromParts.length; i++) {
    dateObject[fromParts[i]] = dateParts[i];
  }

  const toParts = toFormat.slice(0, toFormat.length - 1);
  const newDateParts = [];

  for (const part of toParts) {
    if (part === 'YY' && dateObject['YYYY']) {
      newDateParts.push(dateObject['YYYY'].slice(-2));
    } else if (part === 'YYYY' && dateObject['YY']) {
      const yearStr = dateObject['YY'];
      const year = parseInt(yearStr, 10);

      if (yearStr === '00' || isNaN(year)) {
        newDateParts.push('2000');
      } else {
        newDateParts.push(year < 30 ? '20' + year : '19' + year);
      }
    } else if (part === 'YYYY' && dateObject['YYYY']) {
      newDateParts.push(dateObject['YYYY']);
    } else {
      newDateParts.push(dateObject[part]);
    }
  }

  return newDateParts.join(toSeparator);
}

module.exports = formatDate;
