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
function convertFromFourToTwo(year) {
  return year.substr(2);
}

function convertFromTwoToFour(year) {
  if (+year < 30) {
    return '20' + year;
  }

  return '19' + year;
}

function formatDate(date, fromFormat, toFormat) {
  let yearInFourDigit;
  let yearInTwoDigit;
  let month;
  let day;
  const arrOldDate = date.split(fromFormat[3]);
  const arrNewDate = [];

  for (let i = 0; i < 3; i++) {
    switch (fromFormat[i]) {
      case 'YY': { yearInTwoDigit = arrOldDate[i]; break; }

      case 'YYYY': { yearInFourDigit = arrOldDate[i]; break; }

      case 'MM': { month = arrOldDate[i]; break; }

      case 'DD': { day = arrOldDate[i]; break; }
    }
  }

  for (let i = 0; i < 3; i++) {
    switch (toFormat[i]) {
      case 'YY': {
        if (yearInTwoDigit) {
          arrNewDate.push(yearInTwoDigit);
        } else {
          arrNewDate.push(convertFromFourToTwo(yearInFourDigit));
        }

        break;
      }

      case 'YYYY': {
        if (yearInFourDigit) {
          arrNewDate.push(yearInFourDigit);
        } else {
          arrNewDate.push(convertFromTwoToFour(yearInTwoDigit));
        }

        break;
      }

      case 'MM': { arrNewDate.push(month); break; }

      case 'DD': { arrNewDate.push(day); break; }
    }
  }

  return arrNewDate.join(toFormat[3]);
}

module.exports = formatDate;
