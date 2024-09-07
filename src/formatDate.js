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

  const datePartsMatchedCopy = { ...datePartsMatched };

  if (
    fromFormat.includes(FOUR_DIGIT_YEAR_FORMAT) &&
    toFormat.includes(TWO_DIGIT_YEAR_FORMAT)
  ) {
    const year = datePartsMatchedCopy[FOUR_DIGIT_YEAR_FORMAT];

    datePartsMatchedCopy[TWO_DIGIT_YEAR_FORMAT] = year.slice(2);
  } else if (
    fromFormat.includes(TWO_DIGIT_YEAR_FORMAT) &&
    toFormat.includes(FOUR_DIGIT_YEAR_FORMAT)
  ) {
    const year = datePartsMatchedCopy[TWO_DIGIT_YEAR_FORMAT];
    const newYear = +year < 30 ? `20${year}` : `19${year}`;

    datePartsMatchedCopy[FOUR_DIGIT_YEAR_FORMAT] = newYear;
  }

  return datePartsMatchedCopy;
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

  const possibleDateParts = ['YYYY', 'YY', 'MM', 'DD'];

  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const oldDateParts = date.split(oldSeparator);

  let datePartsMatched = {};

  for (const datePart of possibleDateParts) {
    const datePartIndex = fromFormat.indexOf(datePart);

    if (datePartIndex !== -1) {
      datePartsMatched[datePart] = oldDateParts[datePartIndex];
    }
  }
  datePartsMatched = convertYear(datePartsMatched, fromFormat, toFormat);

  const newDateParts = [];

  for (const datePart of toFormat) {
    if (!possibleDateParts.includes(datePart)) {
      continue;
    }

    const newDatePart = datePartsMatched[datePart];

    newDateParts.push(newDatePart);
  }

  return newDateParts.join(newSeparator);
}

module.exports = formatDate;
