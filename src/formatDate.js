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
  const formattedDate = Array(3);
  const dateArr = date.split(fromFormat[3]);
  const month = dateArr[fromFormat.indexOf('MM')];
  const day = dateArr[fromFormat.indexOf('DD')];
  let fullYear;
  let year;

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    year = dateArr[fromFormat.indexOf('YYYY')].slice(2);
  } else {
    year = dateArr[fromFormat.indexOf('YY')];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    if (dateArr[fromFormat.indexOf('YY')] < 30) {
      fullYear = '20' + dateArr[fromFormat.indexOf('YY')];
    } else {
      fullYear = '19' + dateArr[fromFormat.indexOf('YY')];
    }
  } else {
    fullYear = dateArr[fromFormat.indexOf('YYYY')];
  }

  for (const el of toFormat) {
    if (el === 'YYYY') {
      formattedDate.fill(
        fullYear, toFormat.indexOf('YYYY'), toFormat.indexOf('YYYY') + 1
      );
    }

    if (el === 'YY') {
      formattedDate.fill(
        year, toFormat.indexOf('YY'), toFormat.indexOf('YY') + 1
      );
    }

    if (el === 'MM') {
      formattedDate.fill(
        month, toFormat.indexOf('MM'), toFormat.indexOf('MM') + 1
      );
    }

    if (el === 'DD') {
      formattedDate.fill(
        day, toFormat.indexOf('DD'), toFormat.indexOf('DD') + 1
      );
    }
  }

  return formattedDate.join(toFormat[3]);
}

module.exports = formatDate;
