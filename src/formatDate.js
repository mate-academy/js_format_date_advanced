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
  let day = '';
  let month = '';
  let year = '';
  const splitedDate = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YY') {
      if (parseInt(splitedDate[i]) < 30) {
        year = '20' + splitedDate[i];
      } else {
        year = '19' + splitedDate[i];
      }
    } else if (fromFormat[i] === 'YYYY') {
      year = splitedDate[i];
    } else if (fromFormat[i] === 'MM') {
      month = splitedDate[i];
    } else if (fromFormat[i] === 'DD') {
      day = splitedDate[i];
    }
  };

  const arr = [];

  for (let j = 0; j < 3; j++) {
    switch (toFormat[j]) {
      case 'YY':
        arr.push(year % 100);
        break;
      case 'YYYY':
        arr.push(year);
        break;
      case 'MM':
        arr.push(month);
        break;
      case 'DD':
        arr.push(day);
        break;
    }
  }

  return arr.join(toFormat[3]);
}

module.exports = formatDate;
