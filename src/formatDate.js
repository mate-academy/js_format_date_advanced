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
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    dateObj[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObj['YY'] = dateObj['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = Number(dateObj['YY']);

    if (year < 30) {
      dateObj['YYYY'] = `20${dateObj['YY']}`;
    } else {
      dateObj['YYYY'] = `19${dateObj['YY']}`;
    }
  }

  const resultArray = [];

  for (let i = 0; i < 3; i++) {
    resultArray.push(dateObj[toFormat[i]]);
  }

  return resultArray.join(newSeparator);
}

module.exports = formatDate;
