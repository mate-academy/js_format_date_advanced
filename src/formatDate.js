'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateToArray = date.split(fromFormat[3]);
  const newDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const newValue = toFormat[i];

    for (let y = 0; y < fromFormat.length - 1; y++) {
      const oldValue = fromFormat[y];

      if (newValue === oldValue) {
        newDate[i] = dateToArray[y];
      }

      if (newValue === 'YY' && oldValue === 'YYYY') {
        newDate[i] = dateToArray[y].slice(2);
      }

      if (newValue === 'YYYY' && oldValue === 'YY') {
        newDate[i] = dateToArray[y] < 30
          ? '20' + dateToArray[y]
          : newDate[i] = '19' + dateToArray[y];
      }
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
