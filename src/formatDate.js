'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const getArrData = date.split(fromFormat[3]);

  const newObj = {};

  for (let m = 0; m < fromFormat.length - 1; m++) {
    newObj[fromFormat[m]] = getArrData[m];

    if (fromFormat[m] === 'YY') {
      newObj.YYYY = getArrData[m] < 30 ? `20${getArrData[m]}` : `19${getArrData[m]}`;
    }

    if (fromFormat[m] === 'YYYY') {
      newObj.YY = getArrData[m].slice(-2);
    }
  }

  const arrNewDate = [];

  for (const key of toFormat) {
    if (newObj[key]) {
      arrNewDate.push(newObj[key]);
    }
  }

  const resDate = arrNewDate.join(toFormat[3]);

  return resDate;
}

module.exports = formatDate;
