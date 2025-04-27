'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const partsOfDate = date.split(separator);
  const objectOfParts = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    objectOfParts[fromFormat[i]] = partsOfDate[i];
  }

  let fromYearIndex = 0;
  let toYearIndex = 0;

  if (toFormat.indexOf('YYYY') !== -1) {
    toYearIndex = toFormat.indexOf('YYYY');
  } else {
    toYearIndex = toFormat.indexOf('YY');
  }

  if (fromFormat.indexOf('YYYY') !== -1) {
    fromYearIndex = fromFormat.indexOf('YYYY');
  } else {
    fromYearIndex = fromFormat.indexOf('YY');
  }

  let year;

  if (fromFormat[fromYearIndex] === toFormat[toYearIndex]) {
    year = objectOfParts[fromFormat[fromYearIndex]];
  } else if (
    fromFormat[fromYearIndex] === 'YYYY' &&
    toFormat[toYearIndex] === 'YY'
  ) {
    year = objectOfParts['YYYY'].slice(-2);
  } else if (
    fromFormat[fromYearIndex] === 'YY' &&
    toFormat[toYearIndex] === 'YYYY'
  ) {
    const yearValue = +objectOfParts['YY'];

    year =
      yearValue < 30 ? '20' + objectOfParts['YY'] : '19' + objectOfParts['YY'];
  }

  const newFormat = [];
  const newSeparator = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      newFormat.push(year);
    } else {
      newFormat.push(objectOfParts[toFormat[i]]);
    }
  }

  return newFormat.join(newSeparator);
}

module.exports = formatDate;
