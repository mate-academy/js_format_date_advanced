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

  const dateArr = date.split(fromFormat[3]);
  const data = {};
  const newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
        data.year = dateArr[i];
        break;
      case 'YYYY':
        data.year = dateArr[i];
        break;
      case 'MM':
        data.month = dateArr[i];
        break;
      case 'DD':
        data.day = dateArr[i];
        break;
    }
  }

  if (data.year.length === 2 && data.year < 30) {
    data.longYearForm = '20' + `${data.year}`;
  } else if (data.year.length === 2) {
    data.longYearForm = '19' + `${data.year}`;
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' && data.year.length === 2) {
      newDate.push(data.year);
    } else if (toFormat[i] === 'YYYY' && data.year.length === 4) {
      newDate.push(data.year);
    } else if (toFormat[i] === 'YYYY' && data.year.length === 2) {
      newDate.push(data.longYearForm);
    } else if (toFormat[i] === 'YY' && data.year.length === 4) {
      newDate.push(data.year.slice(2));
    }

    switch (toFormat[i]) {
      case 'MM':
        newDate.push(data.month);
        break;
      case 'DD':
        newDate.push(data.day);
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
