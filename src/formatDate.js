'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const unformatedDate = date.split(fromFormat[3]);
  const formatedDate = [];
  const separator = toFormat[3];

  let day;
  let month;
  let shortYear;
  let longYear;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'DD':
        day = unformatedDate[i];
        break;
      case 'MM':
        month = unformatedDate[i];
        break;
      case 'YY':
        shortYear = unformatedDate[i];
        break;
      case 'YYYY':
        longYear = unformatedDate[i];
        break;
    }
  }

  for (const partOfDate of toFormat) {
    switch (partOfDate) {
      case 'DD':
        formatedDate[formatedDate.length] = day;
        break;
      case 'MM':
        formatedDate[formatedDate.length] = month;
        break;
      case 'YY':
        formatedDate[formatedDate.length] = shortYear === undefined
          ? longYear % 100 : shortYear;
        break;
      case 'YYYY':
        formatedDate[formatedDate.length] = longYear === undefined
          ? shortYear < 30 ? 2000 + +shortYear : 1900 + +shortYear : longYear;
        break;
      default:
        break;
    }
  }

  return formatedDate.join(separator);
}

module.exports = formatDate;
