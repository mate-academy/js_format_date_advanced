'use strict';

/**
 * @param {Object} datePartsMatched
 *
 * @returns {Object}
 */

function convertYear(datePartsMatched) {
  const FOUR_DIGIT_YEAR_FORMAT = 'YYYY';
  const TWO_DIGIT_YEAR_FORMAT = 'YY';

  if (FOUR_DIGIT_YEAR_FORMAT in datePartsMatched) {
    const year = datePartsMatched[FOUR_DIGIT_YEAR_FORMAT];

    datePartsMatched[TWO_DIGIT_YEAR_FORMAT] = year.slice(2);
  } else if (TWO_DIGIT_YEAR_FORMAT in datePartsMatched) {
    const year = datePartsMatched[TWO_DIGIT_YEAR_FORMAT];
    const newYear = +year < 30 ? `20${year}` : `19${year}`;

    datePartsMatched[FOUR_DIGIT_YEAR_FORMAT] = newYear;
  }

  return datePartsMatched;
}

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const oldDateParts = date.split(oldSeparator);

  let datePartsMatched = {};

  for (let i = 0; i < oldDateParts.length; i++) {
    datePartsMatched[fromFormat[i]] = oldDateParts[i];
  }

  datePartsMatched = convertYear(datePartsMatched);

  const newDateParts = [];

  for (let i = 0; i < oldDateParts.length; i++) {
    const newDateFormat = toFormat[i];

    const newDatePart = datePartsMatched[newDateFormat];

    newDateParts.push(newDatePart);
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
