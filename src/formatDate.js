'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[fromFormat.length - 1]);
  const formattedDateParts = [];

  toFormat.forEach((part) => {
    if (part === 'YYYY' || part === 'YY') {
      const formatIndex = fromFormat.findIndex((formatPart) =>
        formatPart === 'YYYY' || formatPart === 'YY');
      let year = dateParts[formatIndex];

      if (year) {
        if (part === 'YY') {
          if (year.length === 4) {
            year = year.slice(-2);
          }
        } else if (year.length === 2 && !toFormat.includes('YY')) {
          const fullYear = parseInt(year);

          if (fullYear === 30) {
            year = '1930';
          } else if (fullYear > 30) {
            year = '19' + year;
          } else {
            year = '20' + year;
          }
        }
      } else {
        year = '';
      }
      formattedDateParts.push(year);
    } else {
      const partIndex = fromFormat.findIndex((formatPart) =>
        formatPart === part);

      formattedDateParts.push(dateParts[partIndex]);
    }
  });

  const separator = toFormat[toFormat.length - 1];
  let formattedDate = formattedDateParts.join(separator);

  if (formattedDate.endsWith(separator)) {
    formattedDate = formattedDate.slice(0, -1);
  }

  return formattedDate;
}

module.exports = formatDate;
