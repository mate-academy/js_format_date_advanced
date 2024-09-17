'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObject = {};
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const resultDate = [];

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  if ('YYYY' in dateObject) {
    dateObject.YY = dateObject.YYYY.slice(2);
  }

  if ('YY' in dateObject) {
    dateObject.YYYY = dateObject.YY < 30
      ? '20' + dateObject.YY
      : '19' + dateObject.YY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    resultDate.push(dateObject[toFormat[i]]);
  }

  return resultDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
