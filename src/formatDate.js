'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const arrDate = date.split(`${fromFormat[fromFormat.length - 1]}`);

  return toFormat
    .map(item => {
      for (let i = 0; i < fromFormat.length - 1; i++) {
        if (fromFormat[i] === item) {
          return arrDate[i];
        }

        if (item === 'YY' && fromFormat[i] === 'YYYY') {
          return arrDate[i].slice(2);
        }

        if (item === 'YYYY' && fromFormat[i] === 'YY') {
          return arrDate[i] < 30 ? '20' + arrDate[i] : '19' + arrDate[i];
        }
      }
    })
    .slice(0, -1)
    .join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
