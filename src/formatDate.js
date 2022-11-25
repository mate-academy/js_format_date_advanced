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

const yearFormat = (to, year) => {
  switch (true) {
    case to === 'YY' && year.length === 4:
      return year.slice(2);
    case to === 'YYYY' && year.length === 2:
      return parseInt(year) < 30 ? '20' + year : '19' + year;
    default:
      return year;
  }
};

function formatDate(date, fromFormat, toFormat) {
  const [, , , fromSep] = fromFormat;
  const [, , , toSep] = toFormat;
  const dateArr = date.split(fromSep);

  let day;
  let month;
  let year;
  const resArr = [];

  fromFormat.forEach((e, index) => {
    if (e === 'YYYY' || e === 'YY') {
      year = dateArr[index];
    }

    if (e === 'MM') {
      month = dateArr[index];
    }

    if (e === 'DD') {
      day = dateArr[index];
    }
  });

  toFormat.forEach((d, i) => {
    if (d === 'YYYY' || d === 'YY') {
      resArr[i] = yearFormat(d, year);
    }

    if (d === 'MM') {
      resArr[i] = month;
    }

    if (d === 'DD') {
      resArr[i] = day;
    }
  });

  return resArr.join(toSep);
}

module.exports = formatDate;
