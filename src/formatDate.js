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
  const fromFormatSeparator = fromFormat[fromFormat.length - 1];
  const dateInCurrentFormat = date.split(fromFormatSeparator);

  const currentDate = {};

  for (let i = 0; i < dateInCurrentFormat.length; i++) {
    const key = fromFormat[i];
    const val = dateInCurrentFormat[i];

    currentDate[key] = val;
  }

  let year, month, day;

  for (const dateItem in currentDate) {
    switch (dateItem) {
      case 'YYYY':
        year = currentDate[dateItem];
        break;
      case 'YY':
        year = currentDate[dateItem];
        year = year < 30 ? '20' + year : '19' + year;
        break;
      case 'MM':
        month = currentDate[dateItem];
        break;
      case 'DD':
        day = currentDate[dateItem];
        break;
    }
  }

  const dateInToFormat = [];

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        dateInToFormat[i] = year;
        break;
      case 'YY':
        dateInToFormat[i] = year.slice(-2);
        break;
      case 'MM':
        dateInToFormat[i] = month;
        break;
      case 'DD':
        dateInToFormat[i] = day;
        break;
    }
  }

  const toFormatSeparator = toFormat[toFormat.length - 1];

  return dateInToFormat.join(toFormatSeparator);
}

module.exports = formatDate;
