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
  const YEAR_ID = 'Y';
  const MONTH_ID = 'M';
  const DAY_ID = 'D';
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const toFormatDivider = toFormat[toFormat.length - 1];
  const resultArray = [];
  const time = {
    day: '',
    month: '',
    year: '',
  };
  let yearIndexFromFormat = 0;
  let yearIndexToFormat = 0;

  for (let i = 0; i < dateArray.length; i++) {
    switch (true) {
      case fromFormat[i].includes(YEAR_ID):
        yearIndexFromFormat = i;
        time.year = dateArray[i];
        break;

      case fromFormat[i].includes(MONTH_ID):
        time.month = dateArray[i];
        break;

      case fromFormat[i].includes(DAY_ID):
        time.day = dateArray[i];
        break;
    }
  }

  for (let i = 0; i < dateArray.length; i++) {
    switch (true) {
      case toFormat[i].includes(YEAR_ID):
        yearIndexToFormat = i;
        resultArray.push(time.year);
        break;

      case toFormat[i].includes(MONTH_ID):
        resultArray.push(time.month);
        break;

      case toFormat[i].includes(DAY_ID):
        resultArray.push(time.day);
        break;
    }
  }

  function reFormYear(year) {
    const fromLength = fromFormat[yearIndexFromFormat].length;
    const toLength = toFormat[yearIndexToFormat].length;

    if (fromLength === toLength) {
      return year;
    }

    if (fromLength > toLength) {
      return year.slice(2, 4);
    }

    return +year >= 30 ? `19${year}` : `20${year}`;
  }

  time.year = reFormYear(time.year);
  resultArray[yearIndexToFormat] = time.year;

  return resultArray.join(toFormatDivider);
}

module.exports = formatDate;
