'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataArray = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};
  const resultArray = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'YY') {
      if (Number(dataArray[i]) > 22) {
        dateObject.YYYY = 19 + dataArray[i];
      } else {
        dateObject.YYYY = 20 + dataArray[i];
      }
    }

    if (fromFormat[i] === 'YYYY') {
      dateObject.YY = dataArray[i].substr(-2);
    }
    dateObject[fromFormat[i]] = dataArray[i];
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultArray[i] = dateObject[toFormat[i]];
  }

  return resultArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
