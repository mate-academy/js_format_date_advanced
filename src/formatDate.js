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
  // write code here
  const currentSeparator = fromFormat.splice(-1, 1).join('');
  const actualSeparator = toFormat.splice(-1, 1).join('');
  const dateArray = date.split(currentSeparator);
  const yearLetter = 'Y';
  const resultDate = [];
  const toCentury = 30;
  const prevCenturyYears = '19';
  const currentCenturyYears = '20';
  let yearLengthFromFormat = 0;
  let yearLengthToFormat = 0;
  let indexOfYear = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    for (let j = 0; j < toFormat.length; j++) {
      if (fromFormat[i][0].includes(toFormat[j][0])) {
        resultDate[j] = dateArray[i];
      }
    }
  }

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes(yearLetter)) {
      yearLengthFromFormat = fromFormat[i].length;
    }

    if (toFormat[i].includes(yearLetter)) {
      yearLengthToFormat = toFormat[i].length;
      indexOfYear = i;
    }
  }

  if (yearLengthFromFormat < yearLengthToFormat) {
    if (resultDate[indexOfYear] < toCentury) {
      resultDate[indexOfYear] = currentCenturyYears + resultDate[indexOfYear];
    } else {
      resultDate[indexOfYear] = prevCenturyYears + resultDate[indexOfYear];
    }
  }

  if (yearLengthFromFormat > yearLengthToFormat) {
    const splicedYear = resultDate[indexOfYear].slice(2);

    resultDate[indexOfYear] = splicedYear;
  }

  return resultDate.join(actualSeparator);
}

module.exports = formatDate;
