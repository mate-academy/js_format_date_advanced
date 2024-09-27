'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const FROM_SEPARATOR = fromFormat[3];
  const TO_SEPARATOR = toFormat[3];
  const DATE = date.split(FROM_SEPARATOR);

  const parsedDate = {};

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        parsedDate.year = DATE[i];
        break;
      case 'YY':
        parsedDate.year = DATE[i];
        break;
      case 'MM':
        parsedDate.month = DATE[i];
        break;
      case 'DD':
        parsedDate.day = DATE[i];
        break;
    }
  }

  const newDate = {};

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (parsedDate.year < '30' && parsedDate.year.length < 3) {
          newDate.year = '20' + parsedDate.year;
        } else if (parsedDate.year >= '30' && parsedDate.year.length < 3) {
          newDate.year = '19' + parsedDate.year;
        } else {
          newDate.year = parsedDate.year;
        }
        break;
      case 'YY':
        newDate.year = parsedDate.year.slice(2);
        break;
      case 'MM':
        newDate.month = parsedDate.month;
        break;
      case 'DD':
        newDate.day = parsedDate.day;
        break;
    }
  }

  const newFormatDate = Object.values(newDate);

  return newFormatDate.join(TO_SEPARATOR);
}

module.exports = formatDate;
