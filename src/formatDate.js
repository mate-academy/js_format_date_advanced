'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSep = fromFormat.pop();
  const newSep = toFormat.pop();
  const dateArr = date.split(oldSep);
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      if (fromFormat[i] === toFormat[j]) {
        newDate[j] = dateArr[i];
      }

      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        newDate[j] = dateArr[i].slice(2);
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        newDate[j] = dateArr[i] < 30
          ? `20${dateArr[i]}`
          : `19${dateArr[i]}`;
      }
    }
  }

  return newDate.join(newSep);
}

module.exports = formatDate;
