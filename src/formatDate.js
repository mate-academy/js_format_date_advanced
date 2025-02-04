'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const partsOfDate = date.split(fromSeparator);
  let dateNewFormat = '';

  for (let i = 0; i < toFormat.length - 1; i++) {
    let index = fromFormat.indexOf(toFormat[i]);

    if (index === -1) {
      if (toFormat[i] === 'YYYY') {
        index = fromFormat.indexOf('YY');

        if (partsOfDate[index] >= 30) {
          partsOfDate[index] = 19 + partsOfDate[index];
        } else {
          partsOfDate[index] = 20 + partsOfDate[index];
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
