'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldDateArr = date.split(fromFormat[3]);
  const newDateArr = [];
  const objDate = {};

  fromFormat.forEach((el, ind) => {
    if (el.includes('YY')) {
      objDate.year = oldDateArr[ind];
    } else if (el.includes('MM')) {
      objDate.month = oldDateArr[ind];
    } else if (el.includes('DD')) {
      objDate.day = oldDateArr[ind];
    } else {
      objDate.delimiter = oldDateArr[ind];
    }
  });

  let { year, delimiter } = objDate;
  const { month, day } = objDate;

  toFormat.forEach(el => {
    if (el.includes('YY')) {
      if (el.length < year.length) {
        year = year.slice(2);
      }

      if (el.length > year.length) {
        year = (+year < 30)
          ? '20' + year
          : '19' + year;
      }
      newDateArr.push(year);
    } else if (el.includes('MM')) {
      newDateArr.push(month);
    } else if (el.includes('DD')) {
      newDateArr.push(day);
    } else {
      delimiter = el;
      newDateArr.push(delimiter);
    }
  });

  return newDateArr.slice(0, 3).join(delimiter);
}

module.exports = formatDate;
