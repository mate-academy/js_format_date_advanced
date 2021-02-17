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
  // write code here
  const separator = fromFormat[3];
  const joiner = toFormat[3];
  const dateArray = date.split(separator);
  const formatedDate = [];

  const yearsFormat = 'YYYY';
  const shortYearsFormat = 'YY';
  const monthFormat = 'MM';
  const daysFormat = 'DD';

  const yearsFormatIndex = toFormat.indexOf(yearsFormat);
  const shortYearsFormatIndex = toFormat.indexOf(shortYearsFormat);
  const monthFormatIndex = toFormat.indexOf(monthFormat);
  const daysFormatIndex = toFormat.indexOf(daysFormat);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === yearsFormat) {
      formatedDate[yearsFormatIndex] = dateArray[i];
    }

    if (fromFormat[i] === yearsFormat
      && (!toFormat.includes(yearsFormat))) {
      formatedDate[shortYearsFormatIndex] = dateArray[i].slice(2);
    }

    if (fromFormat[i] === shortYearsFormat
      && (!toFormat.includes(shortYearsFormat))) {
      let yearsNeedtoChange = dateArray[i];

      if (+yearsNeedtoChange < 30) {
        yearsNeedtoChange = '20' + yearsNeedtoChange;
      } else if (yearsNeedtoChange === '00') {
        yearsNeedtoChange = '2000';
      } else {
        yearsNeedtoChange = '19' + yearsNeedtoChange;
      }
      formatedDate[yearsFormatIndex] = yearsNeedtoChange;
    }

    if (fromFormat[i] === monthFormat) {
      formatedDate[monthFormatIndex] = dateArray[i];
    }

    if (fromFormat[i] === daysFormat) {
      formatedDate[daysFormatIndex] = dateArray[i];
    }
  }

  return formatedDate.join(joiner);
}

module.exports = formatDate;
