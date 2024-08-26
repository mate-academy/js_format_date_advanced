'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatObject = arrayInObject(fromFormat);
  const toFormatObject = arrayInObject(toFormat);
  const arrayOldDate = date.split(fromFormat[3]);
  const dateObject = arrayDateFromObject(arrayOldDate, fromFormat);

  if (fromFormatObject.yy !== toFormatObject.yy) {
    if (fromFormatObject.yy.length === 4) {
      dateObject.yy = dateObject.yy.slice(2);
    } else {
      if (+dateObject.yy < 30) {
        dateObject.yy = '20' + dateObject.yy;
      } else {
        dateObject.yy = '19' + dateObject.yy;
      }
    }
  }

  return resultDate(dateObject, toFormat);
}

function resultDate(dateObject, toFormat) {
  const result = [];

  for (let i = 0; i < 4; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      result.push(dateObject.yy);
    }

    if (toFormat[i] === 'MM') {
      result.push(dateObject.mm);
    }

    if (toFormat[i] === 'DD') {
      result.push(dateObject.dd);
    }
  }

  return result.join(toFormat[3]);
}

function arrayDateFromObject(arrayOldDate, fromFormat) {
  const dateObject = {};

  for (let i = 0; i < 4; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      dateObject.yy = arrayOldDate[i];
    }

    if (fromFormat[i] === 'MM') {
      dateObject.mm = arrayOldDate[i];
    }

    if (fromFormat[i] === 'DD') {
      dateObject.dd = arrayOldDate[i];
    }
  }

  return dateObject;
}

function arrayInObject(array) {
  const result = {};

  for (let i = 0; i < 4; i++) {
    if (array[i] === 'YYYY' || array[i] === 'YY') {
      result.yy = array[i];
    }

    if (array[i] === 'DD') {
      result.dd = array[i];
    }

    if (array[i] === 'MM') {
      result.mm = array[i];
    }
  }

  return result;
}

module.exports = formatDate;
