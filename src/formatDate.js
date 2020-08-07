'use strict';

/*
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const toDate = date.split(oldSeparator);
  const newDate = [];

  for (let i = 0; i < toFormat.length; i++) {
    for (let j = 0; j < fromFormat.length; j++) {
      if (fromFormat[j] === toFormat[i]) {
        newDate.push(toDate[j]);
      }

      if (fromFormat[j] === 'YY' && toFormat[i] === 'YYYY') {
        newDate.push('19' + toDate[j].slice(2, 4));
      }

      if (fromFormat[j] === 'YYYY' && toFormat[i] === 'YY') {
        newDate.push(toDate[j].slice(2, 4));
      }
    }
  }

  const result = newDate.join(newSeparator);

  return result;
}

module.exports = formatDate;
