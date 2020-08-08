'use strict';

/**

 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldArr = date.split(fromFormat[fromFormat.length - 1]);
  let year;
  let month;
  let day;
  const newDateArr = [];

  for (let i = 0; i < fromFormat.length; ++i) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        year = oldArr[i];
        break;
      case 'MM':
        month = oldArr[i];
        break;
      case 'DD':
        day = oldArr[i];
    }
  }

  for (let i = 0; i < fromFormat.length; ++i) {
    for (let j = 0; j < toFormat.length; ++j) {
      if (fromFormat[i] === 'YYYY' && toFormat[j] === 'YY') {
        year = year.split('').slice(2).join('');
      }

      if (fromFormat[i] === 'YY' && toFormat[j] === 'YYYY') {
        if (year > 14) {
          year = `19${year}`;
        } else {
          year = `20${year}`;
        }
      }
    }
  }

  for (let j = 0; j < toFormat.length; ++j) {
    switch (toFormat[j]) {
      case 'YY':
      case 'YYYY':
        newDateArr.push(year);
        break;
      case 'MM':
        newDateArr.push(month);
        break;
      case 'DD':
        newDateArr.push(day);
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
