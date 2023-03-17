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
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const oldDate = date.split(oldSeparator);
  let day, month, year;

  let indexYear, indexMonth, indexDay;

  for (const elem of fromFormat) {
    switch (elem) {
      case 'YY':
      case 'YYYY':
        indexYear = fromFormat.indexOf(elem);
        year = oldDate[indexYear];
        break;
      case 'MM':
        indexMonth = fromFormat.indexOf(elem);
        month = oldDate[indexMonth];
        break;
      case 'DD':
        indexDay = fromFormat.indexOf(elem);
        day = oldDate[indexDay];
    }
  }

  let indexYearNew;

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      indexYearNew = i;
    }
  }

  const lastNumbers = (oldDate[indexYear]).slice(-2);

  if (year.length <= toFormat[indexYearNew].length) {
    if (+lastNumbers < 30) {
      year = '20' + lastNumbers;
    } else {
      year = '19' + lastNumbers;
    }
  } else {
    year = lastNumbers;
  }

  toFormat.pop();

  let res = '';

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YY':
      case 'YYYY':
        res += year;
        break;
      case 'MM':
        res += month;
        break;
      default:
        res += day;
    };

    if (i !== toFormat.length - 1) {
      res += newSeparator;
    }
  }

  return res;
};
module.exports = formatDate;
