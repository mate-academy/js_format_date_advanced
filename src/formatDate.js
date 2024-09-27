'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const formatedArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    for (let j = 0; j < fromFormat.length - 1; j++) {
      if (toFormat[i][0] === fromFormat[j][0]) {
        if (toFormat[i][0] === 'Y') {
          formatedArr[i] = convertYear(dateArr[j], toFormat[i].length);
          break;
        }

        formatedArr[i] = dateArr[j];
        break;
      }
    }
  }

  function convertYear(year, length) {
    if (
      (length === 4 && year.length === 4)
      || (length === 2 && year.length === 2)
    ) {
      return year;
    }

    if (length === 4 && year.length === 2) {
      if (year >= 30) {
        return '19' + year;
      }

      return '20' + year;
    }

    if (length === 2 && year.length === 4) {
      return year.slice(-2);
    }

    return year;
  }

  return formatedArr.join(toFormat[3]);
}

module.exports = formatDate;
