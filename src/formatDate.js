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
  let newDate = '';

  function sliceYearFirst(dateToSlice) {
    fromFormat[0] = dateToSlice.slice(0, 4);
    fromFormat[1] = dateToSlice.slice(5, 7);
    fromFormat[2] = dateToSlice.slice(8);
    delete fromFormat[3];
  }

  function addDeviderCutLast(typeOfDevider) {
    newDate = fromFormat.join(typeOfDevider).slice(0, -1);
  }

  function addDeviderCutFirstReverse(typeOfDevider) {
    newDate = fromFormat.reverse().join(typeOfDevider).slice(1);
  }

  function convertYear(originalYear) {
    if (Number(originalYear) < 30) {
      fromFormat[0] = `20${originalYear}`;
    } else {
      fromFormat[0] = `19${originalYear}`;
    }

    fromFormat[1] = date.slice(3, 5);
    fromFormat[2] = date.slice(6);
    delete fromFormat[3];
  }

  if (toFormat[0] === 'YYYY' && fromFormat[0] === 'YYYY') {
    sliceYearFirst(date);
    addDeviderCutLast(toFormat[3]);
  }

  if (toFormat[0] === 'DD' && fromFormat[0] === 'YYYY') {
    sliceYearFirst(date);
    addDeviderCutFirstReverse(toFormat[3]);
  }

  if (toFormat[2] === 'YY' && fromFormat[2] === 'YYYY') {
    fromFormat[0] = date.slice(0, 2);
    fromFormat[1] = date.slice(3, 5);
    fromFormat[2] = date.slice(8);
    delete fromFormat[3];

    addDeviderCutLast(toFormat[3]);
  }

  if (toFormat[0] === 'YYYY' && fromFormat[0] === 'YY') {
    convertYear(date.slice(0, 2));
    addDeviderCutLast(toFormat[3]);
  }

  if (toFormat[2] === 'YYYY' && fromFormat[0] === 'YY') {
    convertYear(date.slice(0, 2));
    addDeviderCutFirstReverse(toFormat[3]);
  }

  if (toFormat[0] === 'DD' && fromFormat[0] === 'MM') {
    fromFormat[0] = date.slice(0, 2);
    fromFormat[1] = date.slice(3, 7);
    fromFormat[2] = date.slice(8);
    delete fromFormat[3];

    toFormat[0] = fromFormat[2];
    toFormat[1] = fromFormat[0];
    toFormat[2] = fromFormat[1];

    if (toFormat[3] === '-') {
      delete toFormat[3];
      newDate = toFormat.join('-').slice(0, -1);
    }
  }

  return newDate;
}

module.exports = formatDate;
