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
  const oldSeparator = fromFormat.pop();
  const newSeparator = toFormat.pop();
  const oldIndex = date.split(oldSeparator);
  const newIndex = new Array(3);

  for (let i = 0; i < 3; i++) {
    if (fromFormat[i].startsWith('YY') && toFormat.indexOf(fromFormat[i]) < 0) {
      const oldYear = fromFormat[i];
      let notCentury = oldIndex[i];

      if (oldYear.length === 2) {
        const century = oldIndex[i] < 30 ? 20 : 19;

        newIndex[toFormat.indexOf('YYYY')] = century + notCentury;
      } else {
        notCentury = notCentury.slice(-2);

        newIndex[toFormat.indexOf('YY')] = notCentury;
      }
    } else {
      newIndex[toFormat.indexOf(fromFormat[i])] = oldIndex[i];
    }
  }

  return newIndex.join(newSeparator);
}

module.exports = formatDate;
