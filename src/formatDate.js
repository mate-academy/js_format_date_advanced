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
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const splittedDate = date.split(fromSeparator);
  const formattedDate = [];
  let currentYear = 'Y';
  let currentMonth = 'M';
  let currentDay = 'D';

  for (let i = 0; i < fromFormat.length - 1; i += 1) {
    switch (fromFormat[i][0]) {
      case 'Y':
        currentYear += splittedDate[i];
        break;

      case 'M':
        currentMonth += splittedDate[i];
        break;

      case 'D':
        currentDay += splittedDate[i];
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i += 1) {
    let year = currentYear.slice(1);
    const month = currentMonth.slice(1);
    const day = currentDay.slice(1);

    if (year.length > toFormat[i].length) {
      year = year.slice(2);
    }

    if (year.length < toFormat[i].length && +year < 30) {
      year = '20' + year;
    }

    if (year.length < toFormat[i].length && +year >= 30) {
      year = '19' + year;
    }

    switch (toFormat[i][0]) {
      case currentYear[0]:
        formattedDate.push(year);
        break;

      case currentMonth[0]:
        formattedDate.push(month);
        break;

      case currentDay[0]:
        formattedDate.push(day);
        break;

      default:
        break;
    }
  }

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
