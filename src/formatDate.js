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
  const symbolA = fromFormat[fromFormat.length - 1];
  const symbolB = toFormat[toFormat.length - 1];

  const newDateArray = date.split(symbolA).join(symbolB).split(symbolB);
  const newToFormat = toFormat.filter(dateExpression =>
    dateExpression !== dateExpression[dateExpression.length - 1]);
  const newFromFormat = fromFormat.filter(dateExpression =>
    dateExpression !== dateExpression[dateExpression.length - 1]);

  const dateObj = {};
  const formattedDateObj = {};

  for (let i = 0; i < newFromFormat.length; i++) {
    dateObj[fromFormat[i]] = newDateArray[i];
  }

  newToFormat.forEach((newDateExpression, index) => {
    const oldDateExpression = newFromFormat[index];

    if (newDateExpression === 'DD') {
      formattedDateObj['DD'] = dateObj['DD'];
    } else if (newDateExpression === 'MM') {
      formattedDateObj['MM'] = dateObj['MM'];
    } else if (newDateExpression === 'YY') {
      formattedDateObj['YY'] = dateObj['YYYY'].slice(2);
    } else if (newDateExpression === 'YYYY') {
      formattedDateObj['YYYY'] = dateObj['YYYY'];

      if (oldDateExpression === 'YY') {
        if (dateObj['YY'] < 30) {
          formattedDateObj['YYYY'] = dateObj['YY'].padStart(4, '20');
        } else {
          formattedDateObj['YYYY'] = dateObj['YY'].padStart(4, '19');
        }
      }
    }
  });

  return Object.values(formattedDateObj).join(symbolB);
}

module.exports = formatDate;
