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
  const fromFormatArr = fromFormat;
  const separFrom = fromFormat[fromFormat.length - 1];
  const toFormatArr = toFormat;
  const separTo = toFormat[toFormat.length - 1];
  const dateArr = date.split(separFrom);

  const result = [0, 0, 0];

  let day;
  let month;
  let year;

  fromFormatArr.forEach((item, idx) => {
    if (item === 'DD') {
      day = dateArr[idx];
    }

    if (item === 'MM') {
      month = dateArr[idx];
    }

    if (item === 'YY' || item === 'YYYY') {
      year = dateArr[idx];
    }
  });

  toFormatArr.forEach((itemTo, idxTo) => {
    if (itemTo === 'DD') {
      result[idxTo] = day;

      return;
    }

    if (itemTo === 'MM') {
      result[idxTo] = month;

      return;
    }

    if (itemTo === 'YY' || itemTo === 'YYYY') {
      if (year.length === itemTo.length) {
        result[idxTo] = year;

        return;
      }

      if (year.length === 2) {
        if (+year < 30) {
          year = '20' + year;
        } else {
          year = '19' + year;
        }
        result[idxTo] = year;

        return;
      }

      if (year.length === 4) {
        result[idxTo] = year[2] + year[3];
      }
    }
  });

  const resultStr = result.join(separTo);

  return resultStr;
}

module.exports = formatDate;
