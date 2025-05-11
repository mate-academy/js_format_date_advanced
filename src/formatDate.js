'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const parts = date.split(separator);
  const dateParts = {};
  const formatedParts = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateParts[fromFormat[i]] = parts[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    let year = dateParts['YY'];

    if (+year < 30) {
      year = '20' + year;
    } else {
      year = '19' + year;
    }

    dateParts['YYYY'] = year;

    delete dateParts['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    let year = dateParts['YYYY'];

    year = year.slice(-2);

    dateParts['YY'] = year;

    delete dateParts['YYYY'];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const formatKey = toFormat[i];
    const value = dateParts[formatKey];

    formatedParts.push(value);
  }

  return formatedParts.join(newSeparator);
}

module.exports = formatDate;
