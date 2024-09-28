'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SHORTER_YEAR = 'YY';
  const LONGER_YEAR = 'YYYY';
  const TO_19YY = 30;
  const CENTURY_21 = '20';
  const CENTURY_20 = '19';
  const dateParts = date.split(fromFormat[3]);

  const dateObject = {
    [fromFormat[0]]: dateParts[0],
    [fromFormat[1]]: dateParts[1],
    [fromFormat[2]]: dateParts[2],
  };

  for (const partOfDate in dateObject) {
    if (partOfDate === LONGER_YEAR) {
      dateObject[SHORTER_YEAR] = dateObject[partOfDate].slice(-2);
    }

    if (partOfDate === SHORTER_YEAR) {
      if (Number(dateObject[partOfDate]) < TO_19YY) {
        dateObject[LONGER_YEAR] = dateObject[partOfDate]
          .padStart(4, CENTURY_21);
      }

      if (Number(dateObject[partOfDate]) >= TO_19YY) {
        dateObject[LONGER_YEAR] = dateObject[partOfDate]
          .padStart(4, CENTURY_20);
      }
    }
  }

  const formattedDateInArray = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    formattedDateInArray.push(dateObject[toFormat[i]]);
  }

  const formattedDate = formattedDateInArray.join(toFormat[3]);

  return formattedDate;
}

module.exports = formatDate;
