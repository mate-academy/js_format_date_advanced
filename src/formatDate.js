'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];

  const dateArray = date.split(oldSeparator);
  const resultArray = [];
  let resultString = '';

  const PREFIX_PREVIOUS_CENTURY = 19;
  const PREFIX_THIS_CENTURY = 20;
  const TWO_SYMBOL_YEAR_FORMATE = 2;
  const FOUR_SYMBOL_YEAR_FORMATE = 4;
  const FORMAT_LENGTH = 3;

  for (let i = 0; i < FORMAT_LENGTH; i++) {
    for (let j = 0; j < FORMAT_LENGTH; j++) {
      if (
        toFormat[i] === fromFormat[j]
      ) {
        resultArray.push(dateArray[j]);
      } else if (
        toFormat[i].includes('Y')
        && fromFormat[j].includes('Y')
      ) {
        if (
          fromFormat[j].length === FOUR_SYMBOL_YEAR_FORMATE
          && toFormat[i].length === TWO_SYMBOL_YEAR_FORMATE
        ) {
          resultArray.push(dateArray[j].slice(2));
        } else {
          resultArray.push(
            dateArray[j] >= 30
              ? PREFIX_PREVIOUS_CENTURY + dateArray[j]
              : PREFIX_THIS_CENTURY + dateArray[j]
          );
        }
      }
    }
  }

  resultString = resultArray.join(newSeparator);

  return resultString;
}

module.exports = formatDate;
