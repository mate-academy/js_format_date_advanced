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
  let separatorFrom = '';
  let separatorTo = '';
  let dateArr = [];
  let yyyyGenLong = '';
  let yyGenShort = '';
  let ddGen = '';
  let mmGen = '';
  const newDate = [];

  if (date === '') {
    return '';
  }

  for (let i = 3; i < toFormat.length; i++) {
    separatorFrom = fromFormat[3];
    separatorTo = toFormat[3];
    dateArr = date.split(separatorFrom);
  }

  for (let i = 0; i < dateArr.length; i++) {
    if (fromFormat[i] === 'YYYY') {
      yyyyGenLong = dateArr[i];
      yyGenShort = dateArr[i].slice(2);
      continue;
    }

    if (fromFormat[i] === 'YY') {
      yyGenShort = dateArr[i];

      if (dateArr[i] < 30) {
        yyyyGenLong = `20${dateArr[i]}`;
      } else {
        yyyyGenLong = `19${dateArr[i]}`;
      }
      continue;
    }

    if (fromFormat[i] === 'MM') {
      mmGen = dateArr[i];
      continue;
    }

    if (fromFormat[i] === 'DD') {
      ddGen = dateArr[i];
      continue;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'YYYY') {
      newDate[i] = yyyyGenLong;
    }

    if (toFormat[i] === 'YY') {
      newDate[i] = yyGenShort;
    }

    if (toFormat[i] === 'MM') {
      newDate[i] = mmGen;
    }

    if (toFormat[i] === 'DD') {
      newDate[i] = ddGen;
    }
  }

  return newDate.join(separatorTo);
}

module.exports = formatDate;
