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
  let resultDate = '';
  const resultDateArr = [];
  const dateSelector = fromFormat[3];
  const toDateSelector = toFormat[3];
  const dateArr = date.split(dateSelector);
  let day = '';
  let month = '';
  let yearTwoSigns = '';
  let yearFourSigns = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    if (fromFormat[i] === 'DD') {
      day = dateArr[i];
    }

    if (fromFormat[i] === 'MM') {
      month = dateArr[i];
    }

    if (fromFormat[i] === 'YY') {
      yearTwoSigns = dateArr[i];

      if (Number(yearTwoSigns) < 30) {
        yearFourSigns = '20' + yearTwoSigns;
      }

      if (Number(yearTwoSigns) >= 30) {
        yearFourSigns = '19' + yearTwoSigns;
      }
    }

    if (fromFormat[i] === 'YYYY') {
      yearFourSigns = dateArr[i];
      yearTwoSigns = yearFourSigns.split('').slice(2).join('');
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD') {
      resultDateArr[i] = day;
    }

    if (toFormat[i] === 'MM') {
      resultDateArr[i] = month;
    }

    if (toFormat[i] === 'YY') {
      resultDateArr[i] = yearTwoSigns;
    }

    if (toFormat[i] === 'YYYY') {
      resultDateArr[i] = yearFourSigns;
    }
  }

  resultDate = resultDateArr.join(toDateSelector);

  return resultDate;
}

module.exports = formatDate;
