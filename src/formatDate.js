'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldFormatIndexes = [];
  const oldFormatYearQuadro
    = getDMYIndexesSequence(oldFormatIndexes, fromFormat);
  const newFormatIndexes = [];
  const newFormatYearQuadro
    = getDMYIndexesSequence(newFormatIndexes, toFormat);
  const dateToConvert = date.split(fromFormat[fromFormat.length - 1]);

  // if different year formats
  const oldYear = dateToConvert[oldFormatIndexes[2]];

  if (!oldFormatYearQuadro && newFormatYearQuadro) {
    if (+oldYear < 30) {
      dateToConvert[oldFormatIndexes[2]] = `20${oldYear}`;
    } else {
      dateToConvert[oldFormatIndexes[2]] = `19${oldYear}`;
    }
  } else if (oldFormatYearQuadro && !newFormatYearQuadro) {
    dateToConvert[oldFormatIndexes[2]] = oldYear.split('').slice(2).join('');
  }

  const newDate = [];

  for (let i = 0; i <= 3; i++) {
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

  let yearIndex;

  if ((yearIndex = format.indexOf('YY')) !== -1) {
    indexes.push(yearIndex);

    return false;
  }

  indexes.push(format.indexOf('YYYY'));

  return true;
}

module.exports = formatDate;
