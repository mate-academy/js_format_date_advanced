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
  const dateToArr = date.split(fromFormat[3]);
  const resultArray = [];

  function getIndexInput(abbr) {
    for (let i = 0; i < 3; i++) {
      if (fromFormat[i].includes(abbr)) {
        return i;
      }
    }
  }

  const dayIndexInput = getIndexInput('DD');
  const monthIndexInput = getIndexInput('MM');
  const yearIndexInput = getIndexInput('YY');

  function getIndexOutput(abbr) {
    for (let i = 0; i < 3; i++) {
      if (toFormat[i].includes(abbr)) {
        return i;
      }
    }
  }

  const dayIndexOutput = getIndexOutput('DD');
  const monthIndexOutput = getIndexOutput('MM');
  const yearIndexOutput = getIndexOutput('YY');

  resultArray[dayIndexOutput] = dateToArr[dayIndexInput];
  resultArray[monthIndexOutput] = dateToArr[monthIndexInput];

  if (fromFormat[yearIndexInput] === toFormat[yearIndexOutput]) {
    resultArray[yearIndexOutput] = dateToArr[yearIndexInput];
  }

  resultArray[yearIndexOutput] = changeYearFormat();

  function changeYearFormat() {
    switch (true) {
      case resultArray[yearIndexOutput] !== dateToArr[yearIndexInput]
      && dateToArr[yearIndexInput].toString().length === 4
      && toFormat[yearIndexOutput].length === 2:
        return dateToArr[yearIndexInput].toString().slice(2);

      case resultArray[yearIndexOutput] !== dateToArr[yearIndexInput]
      && dateToArr[yearIndexInput] < 30:
        return `${20}${dateToArr[yearIndexInput].toString()}`;

      case resultArray[yearIndexOutput] !== dateToArr[yearIndexInput]
      && dateToArr[yearIndexInput] >= 30:
        return `${19}${dateToArr[yearIndexInput].toString()}`;

      default:
        return dateToArr[yearIndexInput];
    }
  }

  return resultArray.join(toFormat[3]);
}

module.exports = formatDate;
