'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const formatedDate = [];
  const splitedDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        formatedDate[j] = splitedDate[i].slice(2);
        break;
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (splitedDate[i] < 30) {
          formatedDate[j] = '20' + splitedDate[i];
        } else {
          formatedDate[j] = '19' + splitedDate[i];
        }

        break;
      }

      if (fromFormat[i] === toFormat[j]) {
        formatedDate[j] = splitedDate[i];
      }
    }
  }

  return formatedDate.join(toFormat[3]);
}

module.exports = formatDate;
