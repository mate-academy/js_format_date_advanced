'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const newSeparator = toFormat[toFormat.length - 1];
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const oldDateArr = date.split(oldSeparator);
  const dateInfo = {};
  const newDateArr = [];

  for (let index = 0; index < oldDateArr.length; index++) {
    const oldDateIndex = oldDateArr[index];

    dateInfo[fromFormat[index]] = oldDateIndex;

    const year = oldDateIndex < 30
      ? `20${oldDateIndex}`
      : `19${oldDateIndex}`;

    if (fromFormat[index] === 'YY') {
      dateInfo.YYYY = year;
    }

    if (fromFormat[index] === 'YYYY') {
      dateInfo.YY = oldDateIndex.slice(-2);
    }
  }

  for (const elem of toFormat) {
    for (const key in dateInfo) {
      if (elem === key) {
        newDateArr.push(dateInfo[key]);
      }
    }
  }

  return newDateArr.join(newSeparator);
}

module.exports = formatDate;
