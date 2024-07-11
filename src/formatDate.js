'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = parseDate(date, fromFormat);

  return getDate(dateObj, toFormat);
}

function parseDate(date, fromFormat) {
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

function getDate(dateObj, toFormat) {
  const newDateArr = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      newDateArr.push(dateObj.day);
    }

    if (toFormat[i] === 'MM') {
      newDateArr.push(dateObj.month);
    }

    if (toFormat[i] === 'YYYY') {
      newDateArr.push(dateObj.year);
    }

    if (toFormat[i] === 'YY') {
      newDateArr.push(dateObj.year.slice(2));
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
