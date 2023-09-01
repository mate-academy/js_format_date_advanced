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

function checkFormat(array) {
  let yearPosition = -1;
  let yearFromFormat = -1;

  const monthPosition = array.indexOf('MM');
  const dayPosition = array.indexOf('DD');

  if (array.indexOf('YY') === -1) {
    yearPosition = array.indexOf('YYYY');
    yearFromFormat = 0;
  } else {
    yearPosition = array.indexOf('YY');
    yearFromFormat = 1;
  }

  return [yearPosition, monthPosition, dayPosition, yearFromFormat];
}

function changeYearFormat(year, fromFormat, toFormat) {
  switch (true) {
    case (fromFormat === toFormat):
      return year;

    case (fromFormat > toFormat):

      if (+year < 30) {
        return 20 + year;
      } else {
        return 19 + year;
      }

    case (fromFormat < toFormat):
      return year.slice(-2);
  }
}

function formatDate(date, fromFormat, toFormat) {
  // write code here

  const dateArray = date.split(fromFormat[3]);
  const yearFromPosition = checkFormat(fromFormat)[0];
  const yearFromFormat = checkFormat(fromFormat)[3];
  const monthFromPosition = checkFormat(fromFormat)[1];
  const dayFromPosition = checkFormat(fromFormat)[2];
  const yearToPosition = checkFormat(toFormat)[0];
  const yearToFormat = checkFormat(toFormat)[3];
  const monthToPosition = checkFormat(toFormat)[1];
  const dayToPosition = checkFormat(toFormat)[2];

  const resultDate = new Array(3);

  resultDate[yearToPosition] = changeYearFormat(
    dateArray[yearFromPosition],
    yearFromFormat, yearToFormat
  );
  resultDate[monthToPosition] = dateArray[monthFromPosition];
  resultDate[dayToPosition] = dateArray[dayFromPosition];

  const resultStringDate = resultDate.join(toFormat[3]);

  return resultStringDate;
}

module.exports = formatDate;
