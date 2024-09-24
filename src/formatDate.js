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
    const separator = fromFormat[fromFormat.length - 1];
    const currentCharacter = fromCharacter + element.length + separator.length;

    if (element === 'MM') {
      month = date.slice(fromCharacter, toCharacter);
      fromCharacter = currentCharacter;
    }

    if (element === 'DD') {
      day = date.slice(fromCharacter, toCharacter);
      fromCharacter = currentCharacter;
    }

    if (element === 'YYYY') {
      year = date.slice(fromCharacter, toCharacter);
      fromCharacter = currentCharacter;
      yearFormat = element;
    }

    if (element === 'YY') {
      year = date.slice(fromCharacter, toCharacter);
      fromCharacter = currentCharacter;
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
        if (year < parseInt('30')) {
          newDate += `${20}${year}`;
        } else {
          newDate += `${19}${year}`;
        }
      }
    }

    if (
      toFormat[index + 1] &&
      (toFormat[index + 1] === 'DD' ||
        toFormat[index + 1] === 'MM' ||
        toFormat[index + 1] === 'YY' ||
        toFormat[index + 1] === 'YYYY')
    ) {
      newDate += toFormat[toFormat.length - 1];
    }
  });

  return newDate;
}

module.exports = formatDate;
