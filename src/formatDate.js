'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const existedDateArr = date.split(fromFormat[fromFormat.length - 1]);
  const sortedArr = [];
  const resultDateArr = [];

  // sort date to day, month, year
  for (let i = 0; i < fromFormat.length - 1; i++) {
    sortedArr.push(fromFormat[i] + existedDateArr[i]);
  }
  sortedArr.sort();

  const [day, month, year] = sortedArr.map(name => name.match(/\d+/)[0]);

  // order day, month, year according to new format
  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i].includes('D')) {
      resultDateArr.push(day);
    } else if (toFormat[i].includes('M')) {
      resultDateArr.push(month);
    } else {
      if (toFormat[i].length > year.length) {
        if (+year < 30) {
          resultDateArr.push('20' + year);
        } else {
          resultDateArr.push('19' + year);
        }
      } else if (toFormat[i].length < year.length) {
        resultDateArr.push(year.slice(-toFormat[i].length));
      } else {
        resultDateArr.push(year);
      }
    }
  }

  return resultDateArr.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
