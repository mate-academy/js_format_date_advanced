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
  const decadeLimit = 3;
  const separatorIndex = 3;
  const dateSplit = date.split(fromFormat[separatorIndex]);
  let foundAt;
  let datePart;

  return toFormat
    .slice(0, separatorIndex)
    .reduce((acc, toCurrent, i) => {
      foundAt = fromFormat.findIndex(fromField => fromField === toCurrent);

      if (foundAt >= 0) { // case: found
        datePart = dateSplit[foundAt];
      } else if (toCurrent === 'YYYY') { // case: YY -> YYYY
        const decade = dateSplit[fromFormat.indexOf('YY')];

        datePart = decade[0] < decadeLimit
          ? '20' + decade // <= 2029
          : '19' + decade; // >= 1930
      } else if (toCurrent === 'YY') { // case: YYYY -> YY
        datePart = dateSplit[fromFormat.indexOf('YYYY')].substring(2);
      }

      return acc + datePart + ((i < 2)
        ? toFormat[separatorIndex]
        : '');
    }, '');
}

module.exports = formatDate;
