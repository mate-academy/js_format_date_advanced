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
  // magic numbers
  const previousMillennium = 19;
  const currentlyMillennium = 20;
  const yearLimit = 30;
  const twoDigitFormat = 2;
  const fourDigitFormat = 4;
  const indexSeparator = 3;

  // make an array from the date
  const arrayParam = date.split(fromFormat[indexSeparator]);

  let day;
  let month;
  let year;
  const resultArray = [];

  // determine day, month and year
  for (const i in fromFormat) {
    switch (fromFormat[i]) {
      case 'DD': day = arrayParam[i]; break;
      case 'MM': month = arrayParam[i]; break;
      case 'YY': year = arrayParam[i]; break;
      case 'YYYY': year = arrayParam[i];
    }
  }

  // fill resultArray  in new format
  for (const i in toFormat) {
    switch (toFormat[i]) {
      case 'DD':resultArray[i] = day; break;
      case 'MM':resultArray[i] = month; break;
      case 'YY':resultArray[i] = year.substring(2); break;

      case 'YYYY':
        if (year.length === twoDigitFormat && year >= yearLimit) {
          resultArray[i] = previousMillennium + year;
        }

        if (year.length === twoDigitFormat && year < yearLimit) {
          resultArray[i] = currentlyMillennium + year;
        }

        if (year.length === fourDigitFormat) {
          resultArray[i] = year;
        }
    }
  }

  return resultArray.join(toFormat[indexSeparator]);
}

module.exports = formatDate;
