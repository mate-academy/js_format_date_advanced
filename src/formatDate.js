'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const dateObject = {};
  const resultArray = [];

  for (let i = 0; i < dateArray.length; i++) {
    dateObject[fromFormat[i]] = dateArray[i];
  }

  function normalizeYear(beforeYear) {
    let yearFormatYY = 0;
    let yearFormatYYYY = 0;

    if (dateObject.YYYY) {
      yearFormatYYYY = dateObject.YYYY;
      yearFormatYY = dateObject.YYYY.slice(2);
    }

    if (dateObject.YY) {
      if (+dateObject.YY < 30) {
        yearFormatYYYY = '20' + `${dateObject.YY}`;
      } else {
        yearFormatYYYY = '19' + `${dateObject.YY}`;
      }
      yearFormatYY = dateObject.YY;
    }

    if (beforeYear === 'YYYY') {
      return yearFormatYYYY;
    }

    return yearFormatYY;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      resultArray[i] = normalizeYear(toFormat[i]);
    }

    if (toFormat[i] === 'MM') {
      resultArray[i] = dateObject.MM;
    }

    if (toFormat[i] === 'DD') {
      resultArray[i] = dateObject.DD;
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
