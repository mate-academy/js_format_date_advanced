'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(`${fromFormat[fromFormat.length - 1]}`);

  return toFormat
    .map((item) => {
      for (let i = 0; i < fromFormat.length - 1; i++) {
        if (fromFormat[i] === item) {
          return splitDate[i];
        }

        if (item === 'YYYY' && fromFormat[i] === 'YY') {
          return splitDate[i] < 30 ? '20' + splitDate[i] : '19' + splitDate[i];
        }

        if (item === 'YY' && fromFormat[i] === 'YYYY') {
          return splitDate[i].slice(2);
        }
      }
    })
    .slice(0, -1)
    .join(`${toFormat[toFormat.length - 1]}`);
}

module.exports = formatDate;
