'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat.at(-1));

  const day = dateParts[fromFormat.indexOf('DD')];
  const month = dateParts[fromFormat.indexOf('MM')];
  const year =
    dateParts[fromFormat.indexOf('YYYY')] ||
    dateParts[fromFormat.indexOf('YY')];

  return toFormat
    .map((format) => {
      switch (format) {
        case 'DD':
          return day;
        case 'MM':
          return month;

        case 'YYYY':
          if (year < 100 && year.slice(-2) < 30) {
            return '20' + year.slice(-2);
          } else if (year < 100) {
            return '19' + year.slice(-2);
          } else {
            return year;
          }

        case 'YY':
          return year.slice(-2);
        default:
          return '';
      }
    })
    .slice(0, -1)
    .join(toFormat.at(-1));
}

module.exports = formatDate;
