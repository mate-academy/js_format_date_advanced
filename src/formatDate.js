'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts or convert a
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
  const fromSeparator = fromFormat[fromFormat.length - 1];
  const toSeparator = toFormat[toFormat.length - 1];
  const separatedDate = date.split(`${fromSeparator}`);
  const dateToObject = {
    day: '',
    year: '',
    month: '',
  };
  const dateArray = [];

  /* sents to another function to fill in object */

  for (let i = 0; i < fromFormat.length - 1; i++) {
    fillDateObject(fromFormat[i], i);
  }

  /* now creates new date from object */

  for (let i = 0; i < toFormat.length - 1; i++) {
    fillDateArray(toFormat[i], i);
  }

  return dateArray.join(`${toSeparator}`);

  /* change YY year to YYYY year */
  function makeYear(yearToChange) {
    if (+yearToChange >= 30) {
      return '19' + yearToChange;
    }

    return '20' + yearToChange;
  }

  /* fills in objectDate with data */
  function fillDateArray(dateFormatPart) {
    switch (dateFormatPart) {
      case 'DD':
        dateArray.push(dateToObject.day);
        break;
      case 'MM':
        dateArray.push(dateToObject.month);
        break;
      case 'YYYY':
        dateArray.push(dateToObject.year);
        break;
      default:
        dateArray.push(dateToObject.year.split('').splice(2, 3).join('')); ;
    }
  }
  /* changes object values according to new format */

  function fillDateObject(dateFormatPart, index) {
    switch (dateFormatPart) {
      case 'DD':
        dateToObject.day = separatedDate[index];
        break;
      case 'MM':
        dateToObject.month = separatedDate[index];
        break;
      case 'YYYY':
        dateToObject.year = separatedDate[index];
        break;
      default:
        dateToObject.year = makeYear(separatedDate[index]);
    }
  };
};

module.exports = formatDate;
