'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateCopy = date.split(fromFormat[3]);

  const result = [];

  for (let i = 0; i < dateCopy.length; i++) {
    for (let j = 0; j < dateCopy.length; j++) {
      if (fromFormat[j] === toFormat[i]) {
        result[i] = dateCopy[j];
        continue;
      }

      if (fromFormat[j][0] === toFormat[i][0] && fromFormat[j].length === 4) {
        result[i] = dateCopy[j].split('').splice(-2).join('');
        continue;
      }

      if (fromFormat[j][0] === toFormat[i][0] && toFormat[i].length === 4) {
        if (+dateCopy[j] < 30) {
          dateCopy[j] = dateCopy[j].split('');
          dateCopy[j].unshift('20');
          dateCopy[j] = dateCopy[j].join('');
        } else {
          dateCopy[j] = dateCopy[j].split('');
          dateCopy[j].unshift('19');
          dateCopy[j] = dateCopy[j].join('');
        }
        result[i] = dateCopy[j];
        continue;
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
