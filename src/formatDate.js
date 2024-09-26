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

  const formatedArr = [];
  const splitedDate = date.split(fromFormat[3]);

  let day = null;
  let month = null;
  let year = null;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = splitedDate[i];
        break;
      case 'MM':
        month = splitedDate[i];
        break;
      case 'YYYY':
        year = splitedDate[i];
        break;
      case 'YY':
        if (splitedDate[i] > 20 && splitedDate[i] < 99) {
          year = '19' + splitedDate[i];
        } else {
          year = '20' + splitedDate[i];
        }
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'DD':
        formatedArr.push(day);
        break;
      case 'MM':
        formatedArr.push(month);
        break;
      case 'YYYY':
        formatedArr.push(year);
        break;
      case 'YY':
        formatedArr.push(year.slice(2));
        break;
    }
  }

  return formatedArr.join(toFormat[3]);
}

module.exports = formatDate;
