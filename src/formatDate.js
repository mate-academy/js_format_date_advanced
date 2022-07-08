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
  // write code here
  let year;
  let shortYear;
  let longYear;
  let month;
  let isShortYear = true;
  let dayOfMonth;
  let dateToShow = '';
  const inputDate = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        longYear = inputDate[i];
        break;

      case 'YY':
        shortYear = inputDate[i];
        break;

      case 'MM':
        month = inputDate[i];
        break;

      case 'DD':
        dayOfMonth = inputDate[i];
        break;

      default:
        throw new Error('Enter correct date format');
    }
  }

  if (toFormat.includes('YYYY')) {
    isShortYear = false;
  }

  if (isShortYear && shortYear) {
    year = shortYear;
  } else if (isShortYear && !shortYear) {
    year = longYear.slice(2);
  } else if (!isShortYear && longYear) {
    year = longYear;
  } else if (!isShortYear && !longYear) {
    if (+shortYear < 30) {
      year = '20' + shortYear;
    } else {
      year = '19' + shortYear;
    }
  }

  const correctDates = [];

  for (let toWrite = 0; toWrite < toFormat.length - 1; toWrite++) {
    switch (toFormat[toWrite]) {
      case 'YYYY':
        correctDates.push(year);
        break;

      case 'YY':
        correctDates.push(year);
        break;

      case 'MM':
        correctDates.push(month);
        break;

      case 'DD':
        correctDates.push(dayOfMonth);
        break;

      default:
        throw new Error('Enter correct date format');
    }
  }

  dateToShow += correctDates.join(toFormat[3]);

  return dateToShow;
}

module.exports = formatDate;
