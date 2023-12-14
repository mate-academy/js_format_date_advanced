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
  const NOW_CENTURY = '20';
  const LAST_CENTURY = '19';
  const oldSeparator = fromFormat[fromFormat.length - 1];
  const newSeparator = toFormat[toFormat.length - 1];
  const newArray = [];
  let indexYear;
  let day;
  let month;
  let year;

  function getValue(strDate, Separator, index) {
    const indexOfSeparator1 = date.indexOf(Separator);
    const indexOfSeparator2 = date.indexOf(Separator, indexOfSeparator1 + 1);

    switch (index) {
      case 0:
        return strDate.slice(0, indexOfSeparator1);

      case 1:
        return strDate.slice(indexOfSeparator1 + 1, indexOfSeparator2);

      case 2:
        return strDate.slice(indexOfSeparator2 + 1);
    }
  }

  for (const item of fromFormat) {
    switch (item) {
      case 'DD':
        const indexDay = fromFormat.indexOf('DD');

        day = getValue(date, oldSeparator, indexDay);

        break;

      case 'MM':
        const indexMonth = fromFormat.indexOf('MM');

        month = getValue(date, oldSeparator, indexMonth);

        break;

      case 'YYYY':
        indexYear = fromFormat.indexOf('YYYY');
        year = getValue(date, oldSeparator, indexYear);

        break;

      case 'YY':
        indexYear = fromFormat.indexOf('YY');
        year = getValue(date, oldSeparator, indexYear);

        if (+year < 30) {
          year = NOW_CENTURY + year;
        } else {
          year = LAST_CENTURY + year;
        }

        break;

      default:

        break;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    switch (toFormat[i]) {
      case 'DD':
        newArray[i] = day;
        break;

      case 'MM':
        newArray[i] = month;
        break;

      case 'YYYY':
        newArray[i] = year;
        break;

      case 'YY':
        newArray[i] = year.slice(2);
        break;
    }
  }

  return newArray.join(newSeparator);
}

module.exports = formatDate;
