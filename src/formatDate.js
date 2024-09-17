'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = initOjectDate(date, fromFormat);

  return formResultDate(dateObj, toFormat);
}

function formResultDate(dateObj, toFormat) {
  const toSeparator = toFormat[3];
  let resultDate = String();

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
      case 'YY':
        resultDate += convertYear(dateObj.year, toFormat[i]) + toSeparator;
        break;
      case 'DD':
        resultDate += dateObj.day + toSeparator;
        break;
      case 'MM':
        resultDate += dateObj.month + toSeparator;
    }
  }

  return resultDate.substr(0, resultDate.length - 1);
}

function initOjectDate(date, fromFormat) {
  const fromSeparator = fromFormat[3];
  const dateArr = date.split(fromSeparator);
  const dateObj = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i].charAt(0)) {
      case 'Y':
        dateObj.year = dateArr[i];
        break;
      case 'M':
        dateObj.month = dateArr[i];
        break;
      case 'D':
        dateObj.day = dateArr[i];
        break;
    }
  }

  return dateObj;
}

function convertYear(value, mapping) {
  if (value.length >= mapping.length) {
    return value.substr(value.length - mapping.length, mapping.length);
  }

  return Number(value) < 30 ? '20' + value : '19' + value;
}

module.exports = formatDate;
