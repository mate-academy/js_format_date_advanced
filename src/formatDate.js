'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitedDate = date.split(fromFormat[3]);
  const result = [];

  function formatYear(nYear, oYear) {
    let year = oYear;

    if (nYear.length === 2) {
      if (year.length > 2) {
        year = year.slice(-2);
      }
    }

    if (nYear.length === 4) {
      if (year.length < 4) {
        if (+year < 30) {
          year = 20 + year;
        } else {
          year = 19 + year;
        }
      }
    }

    return year;
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let e = 0; e < fromFormat.length - 1; e++) {
      if (toFormat[i][0].toUpperCase() === fromFormat[e][0].toUpperCase()) {
        switch (toFormat[i][0].toUpperCase()) {
          case 'D':
          case 'M':
            result.push(splitedDate[e]);
            break;
          case 'Y':
            result.push(formatYear(toFormat[i], splitedDate[e]));
            break;
          default:
            break;
        }
      }
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
