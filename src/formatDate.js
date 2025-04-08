'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat[3];
  const newSeparator = toFormat[3];
  const parts = date.split(separator); // Converting date to an array
  let fromYearFormat = '';
  let toYearFormat = '';
  let year = '';
  let month = '';
  let day = '';
  const newDate = [];

  // Parcing date from parts with fromFormat
  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      fromYearFormat = fromFormat[i];
      year = parts[i];
    }

    if (fromFormat[i] === 'MM') {
      month = parts[i];
    }

    if (fromFormat[i] === 'DD') {
      day = parts[i];
    }
  }

  // Creating array with date as per toFormat

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      toYearFormat = toFormat[i];

      // Changing of year format if nesessary

      if (toYearFormat !== fromYearFormat && toYearFormat === 'YY') {
        year = year.slice(-2); // Converting from YYYY to YY
      }

      if (toYearFormat !== fromYearFormat && toYearFormat === 'YYYY') {
        const yearNum = parseInt(year, 10);

        year = yearNum < 30 ? `20${year}` : `19${year}`; // Converting from YY to YYYY
      }

      newDate.push(year);
    }

    if (toFormat[i] === 'MM') {
      newDate.push(month);
    }

    if (toFormat[i] === 'DD') {
      newDate.push(day);
    }
  }
  // Getting date in toFormat with new separator

  return newDate.join(newSeparator);
}

module.exports = formatDate;
