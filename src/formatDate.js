'use strict';

/**
 * @param {Object} datePartsMatched
 * @param {string[]} toFormat
 * @param {string[]} fromFormat
 *
 * @returns {Object}
 */

function convertYear(datePartsMatched, fromFormat, toFormat) {
  const FOUR_DIGIT_YEAR_FORMAT = 'YYYY';
  const TWO_DIGIT_YEAR_FORMAT = 'YY';

  if (
    fromFormat.includes(FOUR_DIGIT_YEAR_FORMAT) &&
    toFormat.includes(TWO_DIGIT_YEAR_FORMAT)
  ) {
    const year = datePartsMatched[FOUR_DIGIT_YEAR_FORMAT];

    datePartsMatched[TWO_DIGIT_YEAR_FORMAT] = year.slice(2);
  } else if (
    fromFormat.includes(TWO_DIGIT_YEAR_FORMAT) &&
    toFormat.includes(FOUR_DIGIT_YEAR_FORMAT)
  ) {
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

  datePartsMatched = convertYear(datePartsMatched, fromFormat, toFormat);

  const newDateParts = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const newDateFormat = toFormat[i];

    const newDatePart = datePartsMatched[newDateFormat];

    newDateParts.push(newDatePart);
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
