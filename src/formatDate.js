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
  let copyDate = date;

  const [
    fromFirstItem,
    fromSecondItem,
    fromThirdItem,
    fromSeparator,
  ] = fromFormat;
  const [
    toFirstItem,
    toSecondItem,
    toThirdItem,
    toSeparator,
  ] = toFormat;

  copyDate = copyDate.split(fromSeparator);

  const fromDateList = {};

  fromDateList[fromFirstItem] = copyDate[0];
  fromDateList[fromSecondItem] = copyDate[1];
  fromDateList[fromThirdItem] = copyDate[2];

  const year = fromDateList['YY'] ? fromDateList['YY'] : fromDateList['YYYY'];

  const toDateList = {};

  if (fromDateList[toFirstItem]) {
    toDateList[toFirstItem] = fromDateList[toFirstItem];
  } else if (year.length === 2) {
    if (year < 30) {
      toDateList[toFirstItem] = '20' + year;
    } else {
      toDateList[toFirstItem] = '19' + year;
    }
  } else {
    toDateList[toFirstItem] = year.slice(2);
  }

  if (fromDateList[toSecondItem]) {
    toDateList[toSecondItem] = fromDateList[toSecondItem];
  } else if (year.length === 2) {
    if (year < 30) {
      toDateList[toSecondItem] = '20' + year;
    } else {
      toDateList[toSecondItem] = '19' + year;
    }
  } else {
    toDateList[toSecondItem] = year.slice(2);
  }

  if (fromDateList[toThirdItem]) {
    toDateList[toThirdItem] = fromDateList[toThirdItem];
  } else if (year.length === 2) {
    if (year < 30) {
      toDateList[toThirdItem] = '20' + year;
    } else {
      toDateList[toThirdItem] = '19' + year;
    }
  } else {
    toDateList[toThirdItem] = year.slice(2);
  }

  copyDate = [];

  for (const key in toDateList) {
    copyDate.push(toDateList[key]);
  }

  return copyDate.join(toSeparator);
}

module.exports = formatDate;
