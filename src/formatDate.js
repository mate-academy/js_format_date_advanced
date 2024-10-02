'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dayArr = date.split(fromFormat[3]);
  let [year, month, day] = dayArr;
  const newFormat = [];

  if (fromFormat.indexOf('YYYY') === 0 || fromFormat.indexOf('YY') === 0) {
    [year, month, day] = dayArr;
  } else if (
    fromFormat.indexOf('YYYY') === 1 ||
    fromFormat.indexOf('YY') === 1
  ) {
    [month, year, day] = dayArr;
  } else if (fromFormat.indexOf('MM') === 0) {
    [month, day, year] = dayArr;
  } else {
    [day, month, year] = dayArr;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      if (
        fromFormat.some((word) => word.length > 3) === true &&
        toFormat[i].length === 4
      ) {
        newFormat[i] = year;
      } else if (
        fromFormat.some((word) => word.length > 3) === true &&
        toFormat[i].length !== 4
      ) {
        newFormat[i] = year.slice(2);
      } else if (
        fromFormat.some((word) => word.length > 3) === false &&
        toFormat[i].length === 4 &&
        year < 30
      ) {
        newFormat[i] = '20' + year;
      } else {
        newFormat[i] = '19' + year;
      }
    } else if (toFormat[i] === 'MM') {
      newFormat[i] = month;
    } else {
      newFormat[i] = day;
    }
  }

  return newFormat.join(toFormat[3]);
}

module.exports = formatDate;
