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
  const arrayOfDate = date.split(fromFormat[fromFormat.length - 1]);
  const separatorToJoin = toFormat[toFormat.length - 1];

  const listOfDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    listOfDate[fromFormat[i]] = arrayOfDate[i];
  }

  if (fromFormat.includes('YY')) {
    const year = Number(listOfDate['YY']);

    if (year < 30) {
      listOfDate['YYYY'] = '20' + listOfDate['YY'];
    } else {
      listOfDate['YYYY'] = '19' + listOfDate['YY'];
    }
  } else if (fromFormat.includes('YYYY')) {
    const year = listOfDate['YYYY'];

    const newYear = String(year).slice(2);

    listOfDate['YY'] = newYear;
  }

  const resArr = [];

  for (const key of toFormat) {
    if (key !== separatorToJoin) {
      resArr.push(listOfDate[key]);
    }
  }

  const result = resArr.join(separatorToJoin);

  return result;
}
module.exports = formatDate;
