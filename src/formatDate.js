'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateFormat = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const fromParametr = toFormat[i];

    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (fromParametr === fromFormat[j]) {
        newDate.push(dateFormat[j]);
      }

      if (fromFormat[j] + fromFormat[j] === fromParametr) {
        if (dateFormat[j] < 30) {
          newDate.push('20' + dateFormat[j]);
        } else {
          newDate.push('19' + dateFormat[j]);
        }
      }

      if (fromParametr + fromParametr === fromFormat[j]) {
        newDate.push(dateFormat[j].slice(2));
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
