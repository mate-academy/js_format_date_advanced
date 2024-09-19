'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  let newDate = '';
  let fromCharacter = 0;
  let month;
  let day;
  let year;

  fromFormat.forEach((element) => {
    if (element === 'MM') {
      month = date.slice(fromCharacter, fromCharacter + 2);
      fromCharacter = fromCharacter + 3;
    }

    if (element === 'DD') {
      day = date.slice(fromCharacter, fromCharacter + 2);
      fromCharacter = fromCharacter + 3;
    }

    if (element === 'YYYY') {
      year = date.slice(fromCharacter, fromCharacter + 4);
      fromCharacter = fromCharacter + 5;
    }

    if (element === 'YY') {
      year = date.slice(fromCharacter, fromCharacter + 2);
      fromCharacter = fromCharacter + 3;
    }
  });

  toFormat.forEach((element, index) => {
    if (element === 'DD') {
      newDate += day;
    }

    if (element === 'MM') {
      newDate += month;
    }

    if (element === 'YY') {
      if (year.length === 2) {
        newDate += year;
      } else if (year.length === 4) {
        newDate += year.slice(-2);
      }
    }

    if (element === 'YYYY') {
      if (year.length === 4) {
        newDate += year;
      } else if (year.length === 2) {
        if (year < 30) {
          newDate += `${20}${year}`;
        } else {
          newDate += `${19}${year}`;
        }
      }
    }

    if (index < 2) {
      newDate += toFormat[3];
    }
  });

  return newDate;
}

module.exports = formatDate;
