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
  let yearFormat;

  fromFormat.forEach((element) => {
    const toCharacter = fromCharacter + element.length;

    if (element === 'MM') {
      month = date.slice(fromCharacter, toCharacter);
      fromCharacter = fromCharacter + 3;
    }

    if (element === 'DD') {
      day = date.slice(fromCharacter, toCharacter);
      fromCharacter = fromCharacter + 3;
    }

    if (element === 'YYYY') {
      year = date.slice(fromCharacter, toCharacter);
      fromCharacter = fromCharacter + 5;
      yearFormat = element;
    }

    if (element === 'YY') {
      year = date.slice(fromCharacter, toCharacter);
      fromCharacter = fromCharacter + 3;
      yearFormat = element;
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
      if (yearFormat === 'YY') {
        newDate += year;
      } else if (yearFormat === 'YYYY') {
        newDate += year.slice(-2);
      }
    }

    if (element === 'YYYY') {
      if (yearFormat === 'YYYY') {
        newDate += year;
      } else if (yearFormat === 'YY') {
        if (year < 30) {
          newDate += `${20}${year}`;
        } else {
          newDate += `${19}${year}`;
        }
      }
    }

    if (index < 2) {
      newDate += toFormat[toFormat.length - 1];
    }
  });

  return newDate;
}

module.exports = formatDate;
