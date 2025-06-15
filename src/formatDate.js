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
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const dateObject = {};

  for (let i = 0; i < dateParts.length; ++i) {
    if (fromFormat[i].startsWith('Y')) {
      dateObject.year = dateParts[i];
    } else if (fromFormat[i].startsWith('M')) {
      dateObject.month = dateParts[i];
    } else if (fromFormat[i].startsWith('D')) {
      dateObject.day = dateParts[i];
    }
  }

  const formattedDateParts = [];

  for (let i = 0; i < dateParts.length; ++i) {
    if (toFormat[i].startsWith('Y')) {
      if (toFormat[i].length === 4) {
        if (dateObject.year.length === 4) {
          formattedDateParts.push(dateObject.year);
        } else if (dateObject.year.length === 2) {
          if (+dateObject.year < 30) {
            formattedDateParts.push('20' + dateObject.year);
          } else {
            formattedDateParts.push('19' + dateObject.year);
          }
        }
      } else if (toFormat[i].length === 2) {
        if (dateObject.year.length === 2) {
          formattedDateParts.push(dateObject.year);
        } else if (dateObject.year.length === 4) {
          formattedDateParts.push(dateObject.year.slice(2));
        }
      }
    } else if (toFormat[i].startsWith('M')) {
      formattedDateParts.push(dateObject.month);
    } else if (toFormat[i].startsWith('D')) {
      formattedDateParts.push(dateObject.day);
    }
  }

  return formattedDateParts.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
