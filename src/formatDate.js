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
  const dateArray = date.split(fromFormat[fromFormat.length - 1]);
  const separator = toFormat[toFormat.length - 1];
  let year;
  let month;
  let day;
  let receivedYearFormat;
  let resultYearFormat;
  let resultYearIndex;
  let resultMonthIndex;
  let resultDayIndex;

  for (const elem of toFormat) {
    if (elem === 'YY' || elem === 'YYYY') {
      resultYearFormat = elem;

      resultYearIndex = toFormat.indexOf(elem);
    }

    if (elem === 'MM') {
      resultMonthIndex = toFormat.indexOf(elem);
    }

    if (elem === 'DD') {
      resultDayIndex = toFormat.indexOf(elem);
    }
  }

  for (const elem of fromFormat) {
    if (elem === 'YY' || elem === 'YYYY') {
      receivedYearFormat = elem;

      year = dateArray[fromFormat.indexOf(elem)];
    }

    if (elem === 'MM') {
      month = dateArray[fromFormat.indexOf(elem)];
    }

    if (elem === 'DD') {
      day = dateArray[fromFormat.indexOf(elem)];
    }
  }

  switch (resultYearFormat) {
    case 'YYYY':
      if (receivedYearFormat === 'YY') {
        switch (parseInt(year) < 30) {
          case true:
            year = '20' + year;
            break;

          case false:
            year = '19' + year;
            break;
        }
      }
      break;

    case 'YY':
      if (receivedYearFormat === 'YYYY') {
        year = year.slice(2);
      }
      break;
  }

  dateArray[resultYearIndex] = year;
  dateArray[resultMonthIndex] = month;
  dateArray[resultDayIndex] = day;

  const resultDate = dateArray.join(separator);

  return resultDate;
}

module.exports = formatDate;
