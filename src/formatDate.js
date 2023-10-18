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
  const splittedDate = date.split(fromFormat[3]);
  const separator = toFormat[3];
  const expandedDateFrom = {};
  const expandedDateTo = {};
  let resultDate = [];

  const FULL_YEAR = 'YYYY';
  const SHORT_YEAR = 'YY';
  const TWENTIES = '20';
  const NINETEENTH = '19';
  const YEAR_DIVIDER = 30;

  for (let i = 0; i < 3; i++) {
    expandedDateFrom[fromFormat[i]] = splittedDate[i];
    expandedDateTo[toFormat[i]] = undefined;
  }

  for (const key in expandedDateFrom) {
    if (key in expandedDateTo) {
      expandedDateTo[key] = expandedDateFrom[key];
    }
  }

  if (expandedDateFrom[SHORT_YEAR] && !(expandedDateTo[SHORT_YEAR])) {
    if (expandedDateFrom[SHORT_YEAR] < YEAR_DIVIDER) {
      expandedDateTo[FULL_YEAR] = TWENTIES + expandedDateFrom[SHORT_YEAR];
    } else {
      expandedDateTo[FULL_YEAR] = NINETEENTH + expandedDateFrom[SHORT_YEAR];
    }
  }

  if (expandedDateFrom[FULL_YEAR] && !(expandedDateTo[FULL_YEAR])) {
    expandedDateTo[SHORT_YEAR] = expandedDateFrom[FULL_YEAR].slice(2);
  }

  resultDate = Object.values(expandedDateTo);

  return resultDate.join(separator);
}

module.exports = formatDate;
