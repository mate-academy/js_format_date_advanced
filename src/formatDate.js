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
  const [part0, part1, part2] = fromFormat;
  const newFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
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

    if (part0 === toFormat[i]) {
      newFormat[i] = splitDate[0];
    }

    if (part1 === toFormat[i]) {
      newFormat[i] = splitDate[1];
    }

    if (part2 === toFormat[i]) {
      newFormat[i] = splitDate[2];
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
