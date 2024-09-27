'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const YEAR_INDEX = 2;
  const DATE_REPLACE_ITERATIONS = 3;

  const oldFormatIndexes = [];
  const oldFormatYearQuadro
    = getDMYIndexesSequence(oldFormatIndexes, fromFormat);

  const newFormatIndexes = [];
  const newFormatYearQuadro
    = getDMYIndexesSequence(newFormatIndexes, toFormat);

  const dateToConvert = date.split(fromFormat[fromFormat.length - 1]);
  const oldYear = dateToConvert[oldFormatIndexes[YEAR_INDEX]];

  if (!oldFormatYearQuadro && newFormatYearQuadro) {
    dateToConvert[oldFormatIndexes[YEAR_INDEX]]
      = +oldYear < 30 ? `20${oldYear}` : `19${oldYear}`;
  } else if (oldFormatYearQuadro && !newFormatYearQuadro) {
    dateToConvert[oldFormatIndexes[YEAR_INDEX]]
      = oldYear.split('').slice(2).join('');
  }

  const newDate = [];

  for (let i = 0; i <= DATE_REPLACE_ITERATIONS; i++) {
    newDate[newFormatIndexes[i]] = dateToConvert[oldFormatIndexes[i]];
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

/**
 * function fills array with indexes of day, month, year and
 * returns true, if year format *YYYY*, otherwise - false
 * @param {string[]} indexes
 * @param {string[]} format
 *
 * @returns {boolean}
*/
function getDMYIndexesSequence(indexes, format) {
  indexes.push(format.indexOf('DD'));
  indexes.push(format.indexOf('MM'));

  const yearIndex = format.indexOf('YY');

  if (yearIndex !== -1) {
    indexes.push(yearIndex);

    return false;
  }

  indexes.push(format.indexOf('YYYY'));

  return true;
}

module.exports = formatDate;
