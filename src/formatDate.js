'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let newDate = '';
  const dateArray = date.split(fromFormat[3]);
  const newDateFormat = [...toFormat];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let y = 0; y < toFormat.length - 1; y++) {
      if (fromFormat[i] === 'YYYY' && toFormat[y] === 'YY') {
        newDateFormat[y] = dateArray[i].split('').slice(2).join('');
      }

      if (fromFormat[i] === 'YY' && Number(dateArray[i]) < 30) {
        newDateFormat[y] = `20${dateArray[i]}`;
      }

      if (fromFormat[i] === 'YY' && Number(dateArray[i]) >= 30) {
        newDateFormat[y] = `19${dateArray[i]}`;
      }

      if (fromFormat[i] === toFormat[y]) {
        newDateFormat[y] = dateArray[i];
      }
    }
  }

  newDate = newDateFormat.slice(0, 3).join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
