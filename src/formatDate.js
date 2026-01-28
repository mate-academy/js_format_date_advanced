'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitDate = date.split(fromFormat[3]);
  const newFormat = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      for (let j = 0; j < fromFormat.length; j++) {
        if (fromFormat[j] === 'YY') {
          if (splitDate[j] < 30) {
            newFormat[i] = '20' + splitDate[j];
          } else {
            newFormat[i] = '19' + splitDate[j];
          }
        }
      }
    }

    if (toFormat[i] === 'YY') {
      for (let j = 0; j < fromFormat.length; j++) {
        if (fromFormat[j] === 'YYYY') {
          newFormat[i] = splitDate[j].slice(2, 4);
        }
      }
    }

    for (let j = 0; j < fromFormat.length; j++) {
      if (fromFormat[j] === toFormat[i]) {
        newFormat[i] = splitDate[j];
      }
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
