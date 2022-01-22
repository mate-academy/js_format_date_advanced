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
  const indexesFinalFormat = {};
  const separateDate = date.split(fromFormat[3]);
  const separate = toFormat[toFormat.length - 1];
  const res = [];

  toFormat.forEach((t, i) => {
    if (t.startsWith('D')) {
      indexesFinalFormat.day = i;
    }

    if (t.startsWith('M')) {
      indexesFinalFormat.month = i;
    }

    if (t.startsWith('Y')) {
      indexesFinalFormat.year = i;
      indexesFinalFormat.yearLength = t.length;
    }
  });

  fromFormat.forEach((f, index) => {
    if (f.startsWith('D')) {
      res[indexesFinalFormat.day] = separateDate[index];
    }

    if (f.startsWith('M')) {
      res[indexesFinalFormat.month] = separateDate[index];
    }

    if (f.startsWith('Y')) {
      if (f.length === indexesFinalFormat.yearLength) {
        res[indexesFinalFormat.year] = separateDate[index];
      }

      if (f.length > indexesFinalFormat.yearLength) {
        res[indexesFinalFormat.year] = separateDate[index].slice(2);
      }

      if (f.length < indexesFinalFormat.yearLength) {
        if (+separateDate[indexesFinalFormat.year] >= 30) {
          res[indexesFinalFormat.year] = '19' + separateDate[index];
        } else {
          res[indexesFinalFormat.year] = '20' + separateDate[index];
        }
      }
    }
  });

  return res.join(separate);
}

module.exports = formatDate;
