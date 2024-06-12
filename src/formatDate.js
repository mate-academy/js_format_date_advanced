'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let newDateString = '';
  const oldDateArr = date.split(fromFormat[3]);
  const dateObj = {};
  const newDateArr = [];

  for (let i = 0; i < oldDateArr.length; i++) {
    dateObj[fromFormat[i]] = oldDateArr[i];

    if (fromFormat[i] === 'YY') {
      if (oldDateArr[i] < 30) {
        dateObj.YYYY = '20' + oldDateArr[i];
      }

      if (oldDateArr[i] >= 30) {
        dateObj.YYYY = '19' + oldDateArr[i];
      }
    }

    if (fromFormat[i] === 'YYYY') {
      dateObj.YY = oldDateArr[i].slice(-2);
    }
  }

  for (const elem of toFormat) {
    for (const key in dateObj) {
      if (elem === key) {
        newDateArr.push(dateObj[key]);
      }
    }
  }

  newDateString = newDateArr.join(toFormat[3]);

  return newDateString;
}

module.exports = formatDate;
