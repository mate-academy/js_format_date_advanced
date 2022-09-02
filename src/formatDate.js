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
  const arr = [];
  const separator = fromFormat.pop();
  const dataArr = date.split(separator);
  const toSeparator = toFormat.pop();

  const indexNew = checkDatePlace(toFormat);
  const indexOld = checkDatePlace(fromFormat);
  const newYear = toFormat[indexNew.year];
  const oldYear = fromFormat[indexOld.year];

  arr[indexNew.day] = dataArr[indexOld.day];
  arr[indexNew.month] = dataArr[indexOld.month];

  if (newYear === oldYear) {
    arr[indexNew.year] = dataArr[indexOld.year];
  } else if (newYear.length < oldYear.length) {
    arr[indexNew.year] = dataArr[indexOld.year].slice(2);
  } else {
    if (dataArr[indexOld.year] < 30) {
      arr[indexNew.year] = 20 + dataArr[indexOld.year];
    } else {
      arr[indexNew.year] = 19 + dataArr[indexOld.year];
    }
  }

  return arr.join(toSeparator);
}

function checkDatePlace(formDate) {
  let year = 0;
  let month = 0;
  let day = 0;

  for (let i = 0; i < formDate.length; i++) {
    if (formDate[i].includes('Y')) {
      year = i;
    }

    if (formDate[i].includes('M')) {
      month = i;
    }

    if (formDate[i].includes('D')) {
      day = i;
    }
  }

  return {
    'day': day,
    'month': month,
    'year': year,
  };
}
module.exports = formatDate;
