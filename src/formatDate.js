/* eslint-disable prettier/prettier */
'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(separator);

  let year, month, day;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      year = dateParts[i];
    } else if (fromFormat[i] === 'MM') {
      month = dateParts[i];
    } else if (fromFormat[i] === 'DD') {
      day = dateParts[i];
    }
  }

  const formattedDateParts = [];

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      if (year.length === 4) {
        if (toFormat[i] === 'YY') {
          formattedDateParts.push(year.slice(2));
        } else {
          formattedDateParts.push(year);
        }
      } else if (year.length === 2) {
        if (parseInt(year) >= 30) {
          formattedDateParts.push('19' + year);
        } else {
          formattedDateParts.push('20' + year);
        }
      }
    } else if (toFormat[i] === 'MM') {
      formattedDateParts.push(month);
    } else if (toFormat[i] === 'DD') {
      formattedDateParts.push(day);
    }
  }

  const formattedDate = formattedDateParts.join(newSeparator);

  return formattedDate;
}

module.exports = formatDate;
