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
  let formatedDate = '';
  const fromFormatSeparator = fromFormat[fromFormat.length - 1];
  const toFormatSeparator = toFormat[toFormat.length - 1];
  const dateArray = date.split(fromFormatSeparator);
  let day = '';
  let month = '';
  let shortYear = '';
  let longYear = '';

  for (let i = 0; i < fromFormat.length - 1; i++) {
    const formatIndex = fromFormat[i];
    const dateIndex = dateArray[i];

    switch (formatIndex) {
      case 'DD':
        day += dateIndex;
        break;

      case 'MM':
        month += dateIndex;
        break;

      case 'YY':
        shortYear += dateIndex;
        break;

      case 'YYYY':
        longYear += dateIndex;
        break;

      default:
        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    const index = toFormat[i];

    switch (index) {
      case 'DD':
        formatedDate += day;
        break;

      case 'MM':
        formatedDate += month;
        break;

      case 'YY':
        if (shortYear) {
          formatedDate += shortYear;
        } else {
          formatedDate += longYear.slice(2);
        }
        break;

      case 'YYYY':
        if (longYear) {
          formatedDate += longYear;
        } else {
          if (shortYear < 30) {
            formatedDate += 20 + shortYear;
          } else {
            formatedDate += 19 + shortYear;
          }
        }
        break;

      default:
        break;
    }

    if (i < toFormat.length - 2) {
      formatedDate += toFormatSeparator;
    }
  }

  return formatedDate;
}

module.exports = formatDate;
