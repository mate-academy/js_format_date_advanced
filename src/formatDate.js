'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const currentSeparator = fromFormat[3];
  const desiredSeparator = toFormat[3];
  const dateArray = date.split(currentSeparator);
  const resultArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    for (let j = 0; j < toFormat.length - 1; j++) {
      if (fromFormat[i] === toFormat[j]) {
        resultArray[j] = dateArray[i];
      }

      let year = [];

      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        year = dateArray[i].slice(2);
        resultArray[j] = year;
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        year = dateArray[i];

        if (parseInt(year) < 30) {
          resultArray[j] = `20${year}`;
        } else {
          resultArray[j] = `19${year}`;
        }
      }
    }
  }

  return resultArray.join(desiredSeparator);
}

module.exports = formatDate;
