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
  const separator = toFormat[toFormat.length - 1];
  const dateArr = date.split(fromFormat[fromFormat.length - 1]);
  const inputFormat = fromFormat;

  const dateIndex = toFormat.indexOf('DD');
  const monthIndex = toFormat.indexOf('MM');
  const yearIndex = toFormat.findIndex((element) => element.includes('YY'));

  const compositeParts = dateArr.map((part, index) => {
    return inputFormat[index] + part;
  });

  const orderedComposites = [];

  orderedComposites[dateIndex] = compositeParts.find((format) => {
    return format.includes('DD');
  });

  orderedComposites[monthIndex] = compositeParts.find((format) => {
    return format.includes('MM');
  });

  orderedComposites[yearIndex] = compositeParts.find((format) => {
    return format.includes('YY');
  });

  const resultArray = orderedComposites.map((format) => format.slice(-2));

  if (toFormat[yearIndex].length === 4 && +resultArray[yearIndex] < 30) {
    resultArray[yearIndex] = 20 + resultArray[yearIndex];
  } else if (toFormat[yearIndex].length === 4
    && +resultArray[yearIndex] >= 30) {
    resultArray[yearIndex] = 19 + resultArray[yearIndex];
  }

  const result = resultArray.join(separator);

  return result;
}

module.exports = formatDate;
