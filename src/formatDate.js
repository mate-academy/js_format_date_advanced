'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const dateParts = date.split(fromSeparator);

  let year, month, day;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        year = dateParts[i];
        break;
      case 'YY':
        year = dateParts[i];
        break;
      case 'MM':
        month = dateParts[i];
        break;
      case 'DD':
        day = dateParts[i];
        break;
    }
  }

  const formatedDate = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        if (year.length === 2) {
          const fullYear = year < 30 ? '20' + year : '19' + year;

          formatedDate.push(fullYear);
        } else {
          formatedDate.push(year);
        }
        break;

      case 'YY':
        if (year.length === 4) {
          formatedDate.push(year.slice(2));
        } else {
          formatedDate.push(year);
        }
        break;
      case 'MM':
        if (month.length === 1) {
          month = '0' + month;
        }

        formatedDate.push(month);

        break;
      case 'DD':
        if (day.length === 1) {
          day = '0' + day;
        }

        formatedDate.push(day);

        break;
    }
  }

  return formatedDate.join(toSeparator);
}

module.exports = formatDate;
