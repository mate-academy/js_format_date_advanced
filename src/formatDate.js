'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrayFromDate = date.split(fromFormat[fromFormat.length - 1]);
  const partsOfDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    partsOfDate[fromFormat[i]] = arrayFromDate[i];
  }

  let newYear = '';

  for (const key in partsOfDate) {
    if (key === 'YYYY') {
      const year = partsOfDate[key];

      newYear = year.slice(2);
    }

    if (key === 'YY') {
      newYear =
        partsOfDate[key] < 30
          ? 2000 + +partsOfDate[key]
          : 1900 + +partsOfDate[key];
    }
  }

  const arrayToNewFormat = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        arrayToNewFormat[i] = partsOfDate['YYYY'] || newYear;
        break;
      case 'YY':
        arrayToNewFormat[i] = newYear;
        break;
      case 'MM':
        arrayToNewFormat[i] = partsOfDate['MM'];
        break;
      case 'DD':
        arrayToNewFormat[i] = partsOfDate['DD'];
        break;
      default:
        break;
    }
  }

  return arrayToNewFormat.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
