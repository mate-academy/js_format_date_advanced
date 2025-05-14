'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSeperator = fromFormat[fromFormat.length - 1];
  const newSeperator = toFormat[toFormat.length - 1];
  const inputDateArray = date.split(oldSeperator);
  const dateObject = {};

  for (let i = 0; i < 3; i++) {
    dateObject[fromFormat[i]] = inputDateArray[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    dateObject.YY = dateObject.YYYY.slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    dateObject.YYYY =
      dateObject.YY < 30 ? `20${dateObject.YY}` : `19${dateObject.YY}`;
  }

  const resultDateArray = [];

  for (let k = 0; k < 3; k++) {
    resultDateArray.push(dateObject[toFormat[k]]);
  }

  return resultDateArray.join(newSeperator);
}

module.exports = formatDate;
