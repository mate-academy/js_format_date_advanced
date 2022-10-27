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
  const [, , , oldOperator] = fromFormat;
  const [, , , newOperator] = toFormat;

  const oldDate = date.split(oldOperator);
  const oldDayPlace = fromFormat.indexOf('DD');
  const oldMonthPlace = fromFormat.indexOf('MM');
  const oldYearPlace = fromFormat.indexOf('YY') !== -1
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');

  const newDayPlace = toFormat.indexOf('DD');
  const newMonthPlace = toFormat.indexOf('MM');
  const newYearPlace = toFormat.indexOf('YY') !== -1
    ? toFormat.indexOf('YY')
    : toFormat.indexOf('YYYY');

  const newDate = [];

  newDate[newDayPlace] = oldDate[oldDayPlace];
  newDate[newMonthPlace] = oldDate[oldMonthPlace];

  switch (fromFormat[oldYearPlace]) {
    case toFormat[newYearPlace]:
      newDate[newYearPlace] = oldDate[oldYearPlace];
      break;

    case 'YY':
      newDate[newYearPlace] = (oldDate[oldYearPlace] < 30)
        ? 20 + oldDate[oldYearPlace]
        : 19 + oldDate[oldYearPlace];
      break;

    default:
      newDate[newYearPlace] = oldDate[oldYearPlace].slice(2);
      break;
  }

  return newDate.join(newOperator);
}

module.exports = formatDate;
