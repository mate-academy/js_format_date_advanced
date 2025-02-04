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
  const partsOfDate = date.split(fromSeparator);
  let dateNewFormat = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    let index = fromFormat.indexOf(toFormat[i]);

    if (index === -1) {
      if (toFormat[i] === 'YYYY') {
        index = fromFormat.indexOf('YY');

        if (partsOfDate[index] >= 30) {
          partsOfDate[index] = +partsOfDate[index] + 1900;
        } else {
          partsOfDate[index] = +partsOfDate[index] + 2000;
        }
      }

      if (toFormat[i] === 'YY') {
        index = fromFormat.indexOf('YYYY');
        partsOfDate[index] = +partsOfDate[index].slice(-2);
      }
    }

    if (i > 0) {
      dateNewFormat += toSeparator;
    }

    dateNewFormat += partsOfDate[index];
  }

  return dateNewFormat;
}

module.exports = formatDate;
