'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const newDateArray = [];

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const year = dateArray[fromFormat.indexOf('YY')];

    dateArray[fromFormat.indexOf('YY')] = year < 30 ? '20' + year : '19' + year;
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    const year = dateArray[fromFormat.indexOf('YYYY')];

    dateArray[fromFormat.indexOf('YYYY')] = year[2] + year[3];
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (
        fromFormat[i] === toFormat[j] ||
        (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') ||
        (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY')
      ) {
        newDateArray[j] = dateArray[i];
      }
    }
  }

  return newDateArray.join(toFormat[3]);
}

module.exports = formatDate;
