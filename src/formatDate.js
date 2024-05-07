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
  const newArray = [];

  const oldDate = date.split(fromFormat[fromFormat.length - 1]);

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (fromFormat[j] === 'YY' && toFormat[i] === 'YYYY') {
        const year = parseInt(oldDate[j], 10);

        newArray[i] = (year < 30 ? '20' : '19')
        + (year < 10 ? '0' : '') + year;
      } else if (fromFormat[j] === 'YYYY' && toFormat[i] === 'YY') {
        newArray[i] = oldDate[j].substring(2);
      } else if (fromFormat[j] === toFormat[i]) {
        newArray[i] = oldDate[j];
      }
    }
  }

  newDate = newArray.join(toFormat[toFormat.length - 1]);

  return newDate;
}

module.exports = formatDate;
