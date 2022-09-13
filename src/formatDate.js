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
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const newFormat = toFormat.slice(0, toFormat.length - 1);
  let dayIndex = '';
  let yearIndex = '';
  let monthIndex = '';
  let day = '';
  let year = '';
  let month = '';
  const strToFormat = newFormat.join(toFormat[toFormat.length - 1]);

  for (const partOfDate of fromFormat) {
    switch (partOfDate) {
      case ('DD'):
        dayIndex = fromFormat.indexOf(partOfDate);
        day = dateArray[dayIndex];
        break;
      case ('MM'):
        monthIndex = fromFormat.indexOf(partOfDate);
        month = dateArray[monthIndex];
        break;
      case ('YY'):
      case ('YYYY'):
        yearIndex = fromFormat.indexOf(partOfDate);
        year = dateArray[yearIndex];
        break;
    }
  }

  if (toFormat.includes('YY')) {
    year = shortFormatYear(year);
  } else {
    year = longFormatYear(year);
  }

  const newDate = strToFormat.replace('MM',
    month).replace('DD', day).replace(/YY(YY)|YY/, year);

  return newDate;
}

function shortFormatYear(year) {
  if (year.length === 4) {
    return year.slice(2);
  }

  return year;
}

function longFormatYear(year) {
  if (year.length === 2) {
    if (year < 30) {
      return `20${year}`;
    }

    return `19${year}`;
  }

  return year;
}

module.exports = formatDate;
