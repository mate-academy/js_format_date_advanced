'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function convertToYYYY(year) {
  const numYear = parseInt(year, 10);

  return numYear < 10
    ? '200' + numYear
    : numYear < 30
      ? '20' + numYear
      : '19' + numYear;
}

function convertToYY(year) {
  return year.slice(-2);
}

function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separatorFrom);
  const separatorTo = toFormat[toFormat.length - 1];

  const dateMap = {};

  fromFormat.slice(0, -1).forEach((part, index) => {
    dateMap[part] = dateParts[index];
  });

  const result = toFormat.slice(0, -1).map((part) => {
    if (part === 'YY') {
      return convertToYY(dateMap['YYYY'] || dateMap['YY']);
    }

    if (part === 'YYYY') {
      return dateMap['YYYY'] || convertToYYYY(dateMap['YY']);
    }

    return dateMap[part];
  });

  return result.join(separatorTo);
}
module.exports = formatDate;
