'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(oldSeparator);

  const object = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const key = fromFormat[i];
    const value = dateParts[i];

    object[key] = value;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    object['YY'] = object['YYYY'].slice(2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = parseInt(object['YY']);

    if (year < 30) {
      object['YYYY'] = '20' + (year < 10 ? '0' + year : year);
    } else {
      object['YYYY'] = '19' + year;
    }
  }

  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const key = toFormat[i];

    newDate.push(object[key]);
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
