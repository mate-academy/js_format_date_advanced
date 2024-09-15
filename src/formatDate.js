'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  function changeYearFormat(year, requiredLength) {
    if (year.length === requiredLength) {
      return year;
    }

    if (requiredLength === 2) {
      return year.slice(2);
    }

    return year < 30 ? '20' + year : '19' + year;
  }

  const dateSplited = date.split(fromFormat[3]);
  const newDate = {};

  for (let i = 0; i < dateSplited.length; i++) {
    switch (fromFormat[i]) {
      case 'YY':
      case 'YYYY':
        newDate.year = dateSplited[i];
        break;
      case 'MM':
        newDate.month = dateSplited[i];
        break;
      case 'DD':
        newDate.day = dateSplited[i];
        break;
    }
  }

  for (let i = 0; i < dateSplited.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
        dateSplited[i] = changeYearFormat(newDate.year, 2);
        break;
      case 'YYYY':
        dateSplited[i] = changeYearFormat(newDate.year, 4);
        break;
      case 'MM':
        dateSplited[i] = newDate.month;
        break;
      case 'DD':
        dateSplited[i] = newDate.day;
        break;
    }
  }

  return dateSplited.join(toFormat[3]);
}

module.exports = formatDate;
