'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formattedToDateParts = {}; // day, month, year
  const values = date.split(fromFormat[3]);
  let formattedDate = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' && toFormat[i] === 'YY') {
      formattedToDateParts[2] = values[i].slice(-2);
    } else if (fromFormat[i] === 'YY' && toFormat[i] === 'YYYY') {
      const year = Number(values[i]);

      if (year < 30) {
        formattedToDateParts[2] = '20' + values[i];
      } else {
        formattedToDateParts[2] = '19' + values[i];
      }
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      formattedToDateParts[2] = values[i];
    }

    if (fromFormat[i] === 'DD') {
      formattedToDateParts[0] = values[i];
    }

    if (fromFormat[i] === 'MM') {
      formattedToDateParts[1] = values[i];
    }
  }

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      formattedDate += formattedToDateParts[0];
    } else if (toFormat[i] === 'MM') {
      formattedDate += formattedToDateParts[1];
    } else if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      formattedDate += formattedToDateParts[2];
    }

    if (i < 2) {
      formattedDate += toFormat[3];
    }
  }

  return formattedDate;
}

module.exports = formatDate;
