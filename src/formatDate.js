'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const oldFormatObj = {};
  const newFormatObj = {};
  const joinElelement = toFormat[3];

  for (let i = 0; i < dateArray.length; i++) {
    oldFormatObj[fromFormat[i]] = dateArray[i];
  }

  for (let i = 0; i < 3; i++) {
    for (const key in oldFormatObj) {
      if (key === 'YY' && toFormat[i] === 'YYYY') {
        if (+oldFormatObj[key] < 30) {
          newFormatObj[toFormat[i]] = `20${oldFormatObj[key]}`;
        } else {
          newFormatObj[toFormat[i]] = `19${oldFormatObj[key]}`;
        }
      }

      if (key === 'YYYY' && toFormat[i] === 'YY') {
        newFormatObj[toFormat[i]] = oldFormatObj[key].slice(-2);
      }

      if (toFormat[i] === key) {
        newFormatObj[toFormat[i]] = oldFormatObj[key];
      }
    }
  }

  return Object.values(newFormatObj).join(joinElelement);
}

module.exports = formatDate;
