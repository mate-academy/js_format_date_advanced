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
  const dateArray = date.split(fromFormat[3]);
  const reformattedDateArray = [];
  let index = 0;
  let shortYear;
  let longYear;
  let month;
  let day;

  for (const part of fromFormat) {
    switch (part) {
      case 'YY':
        shortYear = dateArray[index];
        break;
      case 'YYYY':
        longYear = dateArray[index];
        break;
      case 'MM':
        month = dateArray[index];
        break;
      case 'DD':
        day = dateArray[index];
        break;
    }
    index++;
  }

  function yearExtension(yy) {
    for (let i = 2023; i > 1900; i--) {
      if (i % 100 === +yy) {
        return i;
      }
    }

    return 'ERROR in year extansion';
  }

  function yearTrimming(yyyy) {
    return ('' + yyyy).slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    longYear = yearExtension(shortYear);
  } else if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    shortYear = yearTrimming(longYear);
  }

  for (const part of toFormat) {
    switch (part) {
      case 'YY':
        reformattedDateArray.push(shortYear);
        break;
      case 'YYYY':
        reformattedDateArray.push(longYear);
        break;
      case 'MM':
        reformattedDateArray.push(month);
        break;
      case 'DD':
        reformattedDateArray.push(day);
        break;
    }
  }

  return reformattedDateArray.join(toFormat[3]);
}

module.exports = formatDate;
