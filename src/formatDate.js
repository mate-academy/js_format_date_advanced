'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const dateParts = date.split(separatorFrom);

  const dateObj = {};

  fromFormat.slice(0, -1).forEach((part, index) => {
    dateObj[part] = dateParts[index];
  });

  const convertYear = (year, format) => {
    if (format === 'YYYY') {
      if (year.length === 2) {
        return parseInt(year) < 30 ? '20' + year : '19' + year;
      } else {
        return year;
      }
    } else if (format === 'YY') {
      return year.slice(-2);
    }

    return year;
  };

  const newDateParts = toFormat.slice(0, -1).map((part) => {
    if (part === 'YYYY' || part === 'YY') {
      return convertYear(dateObj['YYYY'] || dateObj['YY'], part);
    }

    return dateObj[part];
  });

  const separatorTo = toFormat[toFormat.length - 1];

  return newDateParts.join(separatorTo);
}
module.exports = formatDate;
