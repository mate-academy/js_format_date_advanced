'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [,,, fromSeparator] = fromFormat;
  const newDate = date.split(fromSeparator);
  const [,,, toSeparator] = toFormat;
  const arr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (toFormat[i].includes('Y') && fromFormat[j].includes('Y')) {
        if (toFormat[i] === 'YY' && fromFormat[j] === 'YYYY') {
          arr[i] = newDate[j].slice(2);
        }

        if (fromFormat[j] === 'YY' && newDate[j] < 30) {
          arr[i] = `20${newDate[j]}`;
        }

        if (fromFormat[j] === 'YY' && newDate[j] >= 30) {
          arr[i] = `19${newDate[j]}`;
        }
      }

      if (toFormat[i] === fromFormat[j]) {
        arr[i] = newDate[j];
      }
    }
  }

  return arr.join(toSeparator);
}

module.exports = formatDate;
