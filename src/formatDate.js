'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * indexOfYearFrom from 4 digits to 2 digits and back.
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
  // write code here
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateSplited = date.split(oldSeparator);
  const dateResult = [];

  const indexOfYearFrom = fromFormat.indexOf('YYYY');
  const indexOfShortYearFrom = fromFormat.indexOf('YY');
  const indexOfMonthFrom = fromFormat.indexOf('MM');
  const indexOfDayFrom = fromFormat.indexOf('DD');

  const indexOfYearTo = dateSplited[indexOfYearFrom];
  const indexOfShortYearTo = dateSplited[indexOfShortYearFrom];
  const indexOfMonthTo = dateSplited[indexOfMonthFrom];
  const indexOfDayTo = dateSplited[indexOfDayFrom];

  for (const element of toFormat) {
    if (element === 'DD') {
      dateResult.push(indexOfDayTo);
    }

    if (element === 'MM') {
      dateResult.push(indexOfMonthTo);
    }

    if (element === 'YY') {
      if (indexOfShortYearTo) {
        dateResult.push(indexOfShortYearTo);
      } else {
        dateResult.push(indexOfYearTo.slice(2));
      }
    }

    if (element === 'YYYY') {
      if (indexOfYearTo) {
        dateResult.push(indexOfYearTo);
      } else {
        if (+indexOfShortYearTo < 30) {
          dateResult.push(`20${indexOfShortYearTo}`);
        } else {
          dateResult.push(`19${indexOfShortYearTo}`);
        }
      }
    }
  }

  return dateResult.join(newSeparator);
}

module.exports = formatDate;
