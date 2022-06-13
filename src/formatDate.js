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
  const data = {};
  const dateArray = date.split(fromFormat[3]);
  const dateResult = [];

  switch (date.length) {
    case 10:
      switch ('YYYY') {
        case fromFormat[0]:
          data.year = dateArray[0];
          data.month = (fromFormat[1] === 'MM') ? dateArray[1] : dateArray[2];
          data.day = (fromFormat[1] === 'MM') ? dateArray[2] : dateArray[1];
          break;

        case fromFormat[2]:
          data.year = dateArray[2];
          data.month = (fromFormat[1] === 'MM') ? dateArray[1] : dateArray[0];
          data.day = (fromFormat[1] === 'MM') ? dateArray[0] : dateArray[1];
          break;

        case fromFormat[1]:
          data.year = dateArray[1];
          data.month = (fromFormat[0] === 'MM') ? dateArray[0] : dateArray[2];
          data.day = (fromFormat[0] === 'MM') ? dateArray[2] : dateArray[0];
      }
      break;

    case 8:
      data.month = dateArray[1];
      data.day = (fromFormat[0] === 'YY') ? dateArray[2] : dateArray[0];

      data.year = (fromFormat[0] === 'YY')
        ? (data.year = dateArray[0] < 30
          ? '20' + dateArray[0] : '19' + dateArray[0])
        : (data.year = dateArray[2] < 30
          ? '20' + dateArray[2] : '19' + dateArray[2]);
  }

  dateResult[1] = (toFormat[1] === 'MM') ? data.month : data.day;

  switch ('YYYY') {
    case toFormat[0]:
      dateResult[0] = data.year;
      dateResult[2] = (toFormat[1] === 'MM') ? data.day : data.month;
      break;

    case toFormat[2]:
      dateResult[2] = data.year;
      dateResult[0] = (toFormat[1] === 'MM') ? data.day : data.month;
  }

  switch ('YY') {
    case toFormat[0]:
      dateResult[0] = data.year.slice(2);
      dateResult[2] = (toFormat[1] === 'MM') ? data.day : data.month;
      break;

    case toFormat[2]:
      dateResult[2] = data.year.slice(2);
      dateResult[0] = (toFormat[1] === 'MM') ? data.day : data.month;
  }

  return dateResult.join(toFormat[3]);
}

module.exports = formatDate;
