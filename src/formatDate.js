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
  const [firstType, secondType, thirdType, fromSeparator] = fromFormat;
  const toSeparator = toFormat[3];
  const givenDate = date.split(fromSeparator);
  const dateNow = {
    [firstType[0]]: givenDate[0],
    [secondType[0]]: givenDate[1],
    [thirdType[0]]: givenDate[2],
  };

  for (const dateType of toFormat) {
    if (dateType[0] === 'Y') {
      switch (dateType.length - dateNow.Y.length) {
        case 2:
          if (dateNow.Y < 30) {
            dateNow.Y = 20 + dateNow.Y;
          } else {
            dateNow.Y = 19 + dateNow.Y;
          }
          break;
        case -2:
          dateNow.Y = dateNow.Y.slice(2);
          break;
      }
    }
  }

  let dateToReturn = [];

  for (let i = 0; i < 3; i++) {
    dateToReturn.push(dateNow[toFormat[i][0]]);
  }
  dateToReturn = dateToReturn.join(toSeparator);

  return dateToReturn;
}

module.exports = formatDate;
