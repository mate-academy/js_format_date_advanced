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
  const oldDateArr = date.split(fromFormat[3]);
  const newDateArr = [];

  const LAST_FORMAT_SECTION_INDEX = 3;
  const FULL_YEAR_LENGTH = 4;
  const MAX_YEAR_FOR_LATEST_CENTURY = 30;

  // # cycle through every old format section for every new format section

  for (
    let toFormatIndex = 0;
    toFormatIndex < LAST_FORMAT_SECTION_INDEX;
    toFormatIndex++
  ) {
    for (
      let fromFormatIndex = 0;
      fromFormatIndex < LAST_FORMAT_SECTION_INDEX;
      fromFormatIndex++
    ) {
      // # find matching section types
      if (fromFormat[fromFormatIndex][0] === toFormat[toFormatIndex][0]) {
        // # check wether old and new format sections are equal length
        // # (since only Year type changes)
        if (
          fromFormat[fromFormatIndex].length !== toFormat[toFormatIndex].length
        ) {
          // # check which if old format is longer
          if (fromFormat[fromFormatIndex].length === FULL_YEAR_LENGTH) {
            newDateArr.push(oldDateArr[fromFormatIndex].slice(2));
          } else {
            newDateArr.push(
              // prettier-ignore
              // # (otherwise linter error)
              (+oldDateArr[fromFormatIndex] < MAX_YEAR_FOR_LATEST_CENTURY
                ? '20'
                : '19')
              + oldDateArr[fromFormatIndex]
            );
          }
        } else {
          newDateArr.push(oldDateArr[fromFormatIndex]);
        }
      }
    }
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
