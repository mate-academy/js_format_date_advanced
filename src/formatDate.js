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
  const oldDate = {};
  const newDateArr = [];
  const dateArr = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
      case 'YY':
        oldDate.year = dateArr[i];
        break;
      case 'MM':
        oldDate.month = dateArr[i];
        break;
      case 'DD':
        oldDate.day = dateArr[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (oldDate.year.length < 4) {
          oldDate.year = +oldDate.year
          >= 30 ? '19' + oldDate.year : '20' + oldDate.year;
        }
        newDateArr[i] = oldDate.year;
        break;
      case 'YY':
        if (oldDate.year.length > 2) {
          oldDate.year = oldDate.year.slice(2);
        }
        newDateArr[i] = oldDate.year;
        break;
      case 'MM':
        newDateArr[i] = oldDate.month;
        break;
      case 'DD':
        newDateArr[i] = oldDate.day;
        break;
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
