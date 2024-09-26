'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArrFrom = date.split(fromFormat[fromFormat.length - 1]);

  const dateArrTo = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      const keyFrom = fromFormat[i];
      const keyTo = toFormat[j];

      if (keyTo === keyFrom) {
        dateArrTo[j] = dateArrFrom[i];
      }

      if (keyTo === 'YY' && keyFrom === 'YYYY') {
        dateArrTo[j] = dateArrFrom[i].slice(2);
      } else if (keyTo === 'YYYY' && keyFrom === 'YY') {
        dateArrTo[j] = dateArrFrom[i] < '30' ? '20' + dateArrFrom[i]
          : '19' + dateArrFrom[i];
      }
    }
  }

  return dateArrTo.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
