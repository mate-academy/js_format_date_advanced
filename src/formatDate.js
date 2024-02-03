'use strict';

/**
 *   Time flies, standards change. Let"s get rid of the routine of changing the
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
 *   "2020-02-18",
 *   ["YYYY", "MM", "DD", "-"],
 *   ["YYYY", "MM", "DD", "."],
 * ) // "2020.02.18"
 *
 * formatDate(
 *   "2020-02-18",
 *   ["YYYY", "MM", "DD", "-"],
 *   ["DD", "MM", "YYYY", "."],
 * ) // "18.02.2020"
 *
 * formatDate(
 *   "18-02-2020",
 *   ["DD", "MM", "YYYY", "-"],
 *   ["DD", "MM", "YY", "/"],
 * ) // "18/02/20"
 *
 * formatDate(
 *   "20/02/18",
 *   ["YY", "MM", "DD", "/"],
 *   ["YYYY", "MM", "DD", "."],
 * ) // "2020.02.18"
 *
 * formatDate(
 *   "97/02/18",
 *   ["YY", "MM", "DD", "/"],
 *   ["DD", "MM", "YYYY", "."],
 * ) // "18.02.1997"
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const separatorFirst = fromFormat[fromFormat.length - 1];
  const dateArr = date.split(separatorFirst);
  const findIndexYear = fromFormat.findIndex(
    (num) => num === 'YYYY' || num === 'YY'
  );
  const findIndexNewYear = toFormat.findIndex(
    (num) => num === 'YYYY' || num === 'YY'
  );
  const year = dateArr[findIndexYear];
  let newYear = '';
  const newDate = [];

  if (year.length === 4 && toFormat[findIndexNewYear] === 'YYYY') {
    newYear = year;
  } else {
    if (toFormat[findIndexNewYear] === 'YY') {
      newYear = year.slice(-2);
    } else if (toFormat[findIndexNewYear] === 'YYYY') {
      const toNewFormat = parseInt(year, 10) < 30 ? '20' : '19';

      newYear = toNewFormat + year;
    }
  }

  const findIndexDate = fromFormat.findIndex((num) => num === 'DD');
  const findIndexTodate = toFormat.findIndex((num) => num === 'DD');
  const day = dateArr[findIndexDate];

  const findIndexMon = fromFormat.findIndex((num) => num === 'MM');
  const findIndexToMon = toFormat.findIndex((num) => num === 'MM');
  const mon = dateArr[findIndexMon];

  newDate[findIndexToMon] = mon;
  newDate[findIndexNewYear] = newYear;
  newDate[findIndexTodate] = day;

  const separator = toFormat[toFormat.length - 1];

  return newDate.join(separator);
}

module.exports = formatDate;
