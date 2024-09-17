'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateArray = date.split(oldSeparator);
  const formatedDate = [];

  for (let i = 0; i < dateArray.length; i++) {
    for (let j = 0; j < dateArray.length; j++) {
      if (fromFormat[i] === toFormat[j]) {
        formatedDate[j] = dateArray[i];
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (dateArray[i] >= 30) {
          formatedDate[j] = '19' + dateArray[i];
        } else if (dateArray[i] < 30) {
          formatedDate[j] = '20' + dateArray[i];
        }
      } else if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        formatedDate[j] = dateArray[i].slice(-2);
      }
    }
  }

  return formatedDate.join(newSeparator).toString();
}

module.exports = formatDate;
