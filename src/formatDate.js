'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function convertToYYYY(year) {
  return parseInt(year) < 30 ? '20' + year : '19' + year;
}

function convertToYY(year) {
  return year.slice(-2);
}

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separatorFrom);

  const dateObj = {};

  fromFormat.slice(0, -1).forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  const newDateParts = toFormat.slice(0, -1).map((part) => {
    if (part === 'YYYY') {
      return dateObj['YY'] ? convertToYYYY(dateObj['YY']) : dateObj['YYYY'];
    } else if (part === 'YY') {
      return dateObj['YYYY'] ? convertToYY(dateObj['YYYY']) : dateObj['YY'];
    }

    return dateObj[part];
  });

  const separatorTo = toFormat[toFormat.length - 1];

  return newDateParts.join(separatorTo);
}
module.exports = formatDate;
