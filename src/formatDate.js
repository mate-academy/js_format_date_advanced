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
  let year = '';
  let month = '';
  let day = '';
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];

  const FormatOld = date.split(oldSeparator);

  fromFormat.forEach((PartOfDate, i) => {
    if (PartOfDate[0] === 'Y') {
      year = FormatOld[i];
    }

    if (PartOfDate[0] === 'M') {
      month = FormatOld[i];
    }

    if (PartOfDate[0] === 'D') {
      day = FormatOld[i];
    }
  });

  const FormatNew = [];

  toFormat.forEach(PartOfDate => {
    if (PartOfDate[0] === 'Y') {
      if (year.length > PartOfDate.length) {
        year = year.slice(2);
      } else if (year.length < PartOfDate.length) {
        let century = '';

        if (+year < 30) {
          century = '20';
        }

        if (+year >= 30) {
          century = '19';
        }

        year = century + year;
      }

      FormatNew.push(year);
    }

    if (PartOfDate[0] === 'M') {
      FormatNew.push(month);
    }

    if (PartOfDate[0] === 'D') {
      FormatNew.push(day);
    }
  });

  return FormatNew.join(newSeparator);
}

module.exports = formatDate;
