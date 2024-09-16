'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const copyDate = date.split(oldSeparator);
  const copyFromFormat = fromFormat.slice(0, -1);
  const copyToFormat = toFormat.slice(0, -1);
  const newDate = [];

  for (let i = 0; i < copyToFormat.length; i++) {
    for (let k = 0; k < copyFromFormat.length; k++) {
      if (copyToFormat[i] === copyFromFormat[k]) {
        newDate.push(copyDate[k]);
      }

      if (copyToFormat[i] === 'YY' && copyFromFormat[k] === 'YYYY') {
        newDate.push(copyDate[k].slice(2, 4));
      }

      if (copyToFormat[i] === 'YYYY'
        && copyFromFormat[k] === 'YY' && +copyDate[k] < 30) {
        newDate.push('20' + copyDate[k]);
      }

      if (copyToFormat[i] === 'YYYY'
        && copyFromFormat[k] === 'YY' && +copyDate[k] >= 30) {
        newDate.push('19' + copyDate[k]);
      }
    }
  }

  return newDate.join(newSeparator);
}

module.exports = formatDate;
