'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateValue = date.split(fromFormat[3]);
  const newDate = [];

  let day = '';
  let month = '';
  let year = '';

  let lengthYearFrom = '';
  let lengthYearTo = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (true) {
      case fromFormat[i] === 'DD':
        day += dateValue[i];
        break;
      case fromFormat[i] === 'MM':
        month += dateValue[i];
        break;
      case fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY':
        year += dateValue[i];
        lengthYearFrom += fromFormat[i];
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (true) {
      case toFormat[i] === 'DD':
        newDate[i] = day;
        break;
      case toFormat[i] === 'MM':
        newDate[i] = month;
        break;
      case toFormat[i] === 'YY' || toFormat[i] === 'YYYY':
        lengthYearTo += toFormat[i];

        switch (true) {
          case lengthYearFrom.length > lengthYearTo.length:
            year = year.slice(-2);
            break;

          case lengthYearFrom.length < lengthYearTo.length:
            switch (true) {
              case year > 25:
                year = '19' + year;
                break;
              case year < 25:
                year = '20' + year;
                break;
            }
        }
        newDate[i] = year;
        break;
    }
  }

  return newDate.join(toFormat[3]);
}

module.exports = formatDate;
