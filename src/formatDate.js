'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateFormat = {};
  const fromSeparator = fromFormat[3];
  const dateParts = date.split(fromSeparator);

  for (let i = 0; i < dateParts.length; i++) {
    dateFormat[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateFormat['YY'] = dateFormat['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = Number(dateFormat['YY']);

    if (year < 30) {
      dateFormat['YYYY'] = '20' + dateFormat['YY'];
    } else {
      dateFormat['YYYY'] = '19' + dateFormat['YY'];
    }
  }

  const toSeparator = toFormat[3];
  const result = [];

  for (let i = 0; i < dateParts.length; i++) {
    result.push(dateFormat[toFormat[i]]);
  }

  return result.join(toSeparator);
}

module.exports = formatDate;
