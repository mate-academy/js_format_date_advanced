'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , separator] = fromFormat;
  const [, , , newSeparator] = toFormat;

  const dateArray = date.split(separator);
  const newDateArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      if (+dateArray[i] < 30) {
        dateArray[i] = dateArray[i].padStart(4, '20');
      } else {
        dateArray[i] = dateArray[i].padStart(4, '19');
      }
    }

    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i].includes('Y') && toFormat[j].includes('Y')) {
        if (toFormat[j] === 'YY') {
          newDateArray[j] = dateArray[i].slice(2);
        } else {
          newDateArray[j] = dateArray[i];
        }
      }

      if (fromFormat[i] === 'MM' && toFormat[j] === 'MM') {
        newDateArray[j] = dateArray[i];
      }

      if (fromFormat[i] === 'DD' && toFormat[j] === 'DD') {
        newDateArray[j] = dateArray[i];
      }
    }
  }

  return newDateArray.join(newSeparator);
}

module.exports = formatDate;
