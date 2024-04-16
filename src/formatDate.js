'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateArray = date.split(fromFormat[3]);
  const newDateArray = Array(3);

  newDateArray[toFormat.indexOf('DD')]
    = oldDateArray[fromFormat.indexOf('DD')];

  newDateArray[toFormat.indexOf('MM')]
    = oldDateArray[fromFormat.indexOf('MM')];

  if (toFormat.includes('YY')) {
    const newYear = (fromFormat.includes('YY'))
      ? oldDateArray[fromFormat.indexOf('YY')]
      : oldDateArray[fromFormat.indexOf('YYYY')].slice(2);

    newDateArray[toFormat.indexOf('YY')] = newYear;
  }

  if (toFormat.includes('YYYY')) {
    let newYear;

    if (fromFormat.includes('YYYY')) {
      newYear = oldDateArray[fromFormat.indexOf('YYYY')];
    } else {
      if (+oldDateArray[fromFormat.indexOf('YY')] < 30) {
        newYear = '20' + oldDateArray[fromFormat.indexOf('YY')];
      } else {
        newYear = '19' + oldDateArray[fromFormat.indexOf('YY')];
      }
    }

    newDateArray[toFormat.indexOf('YYYY')] = newYear;
  }

  return newDateArray.join(toFormat[3]);
}

module.exports = formatDate;
