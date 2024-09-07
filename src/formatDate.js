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
  const dateObj = parseData(date, fromFormat);

  return getData(dateObj, toFormat);
}

function parseData(date, fromFormat) {
  const dateObj = {};

  for (let i = 0; i < 3; i++) {
    const part = date.split(fromFormat[3])[i];

    if (fromFormat[i] === 'DD') {
      dateObj.day = part;
    }

    if (fromFormat[i] === 'MM') {
      dateObj.month = part;
    }

    if (fromFormat[i] === 'YYYY') {
      dateObj.year = part;
    }

    if (fromFormat[i] === 'YY') {
      if (part < 30) {
        dateObj.year = '20' + part;
      } else {
        dateObj.year = '19' + part;
      }
    }
  }

  return dateObj;
}

function getData(dateObj, toFormat) {
  const newDataArr = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      newDataArr.push(dateObj.day);
    }

    if (toFormat[i] === 'MM') {
      newDataArr.push(dateObj.month);
    }

    if (toFormat[i] === 'YYYY') {
      newDataArr.push(dateObj.year);
    }

    if (toFormat[i] === 'YY') {
      newDataArr.push(dateObj.year.slice(2));
    }
  }

  return newDataArr.join(toFormat[3]);
}
module.exports = formatDate;
