'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let year, mounth, day;

  const actualDate = date.split(fromFormat[3]);

  let newDate = [];

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'DD') {
      day = actualDate[i];
    } else if (fromFormat[i] === 'MM') {
      mounth = actualDate[i];
    } else if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      year = actualDate[i];
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'DD') {
      newDate[i] = day;
    } else if (toFormat[i] === 'MM') {
      newDate[i] = mounth;
    } else if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      if (year.length !== toFormat[i].length) {
        if (year.length === 4) {
          year = year.slice(-2);
        } else {
          if (year < 30) {
            year = '20' + year;
          } else {
            year = '19' + year;
          }
        }
      }

      newDate[i] = year;
    }
  }

  newDate = newDate.join(toFormat[3]);

  return newDate;
}

module.exports = formatDate;
