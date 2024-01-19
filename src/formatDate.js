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
  const arrayWithDate = date.split(fromFormat[3]);
  let dayNumber = '';
  let monthNumber = '';
  let yearNumber = '';

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i] === 'DD') {
      dayNumber = arrayWithDate[i];
    }

    if (fromFormat[i] === 'MM') {
      monthNumber = arrayWithDate[i];
    }

    if (fromFormat[i] === 'YY' || fromFormat[i] === 'YYYY') {
      yearNumber = arrayWithDate[i];
    }
  }

  const arrayWithConvertDate = [];

  for (let i = 0; i < 3; i++) {
    if (toFormat[i] === 'DD') {
      arrayWithConvertDate[i] = dayNumber;
    }

    if (toFormat[i] === 'MM') {
      arrayWithConvertDate[i] = monthNumber;
    }

    if (toFormat[i] === 'YY' || toFormat[i] === 'YYYY') {
      yearNumber = convertYear(yearNumber, toFormat[i]);
      arrayWithConvertDate[i] = yearNumber;
    }
  }

  return arrayWithConvertDate.join(toFormat[3]);
}

function convertYear(year, format) {
  if (year.length === format.length) {
    return year;
  }

  if (year.length > format.length) {
    return year.slice(2);
  }

  if (year.length < format.length) {
    if (+year < 30) {
      return `20${year}`;
    } else {
      return `19${year}`;
    }
  }
}

module.exports = formatDate;
