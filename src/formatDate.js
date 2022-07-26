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
  const dateArray = date.split(fromFormat[3]);

  // ff = fromFormat, tf = toFormat
  const ffDayIndex = fromFormat.indexOf('DD');
  const ffMonthIndex = fromFormat.indexOf('MM');
  const ffYearFourIndex = fromFormat.indexOf('YYYY');
  const ffYearTwoIndex = fromFormat.indexOf('YY');
  const tfDayIndex = toFormat.indexOf('DD');
  const tfMonthIndex = toFormat.indexOf('MM');
  const tfYearFourIndex = toFormat.indexOf('YYYY');
  const tfYearTwoIndex = toFormat.indexOf('YY');

  const arrayDateToFormat = [];
  let yearFourResult = '';

  if (fromFormat.includes('YY') === true) {
    const yearTwoValue = dateArray[ffYearTwoIndex];

    if (dateArray[ffYearTwoIndex] >= 30) {
      yearFourResult = `19${yearTwoValue}`;
    } else {
      yearFourResult = `20${yearTwoValue}`;
    }
  } else {
    yearFourResult = dateArray[ffYearFourIndex];
  }

  arrayDateToFormat[tfDayIndex] = dateArray[ffDayIndex];
  arrayDateToFormat[tfMonthIndex] = dateArray[ffMonthIndex];

  if (toFormat.includes('YY') === true) {
    arrayDateToFormat[tfYearTwoIndex] = dateArray[ffYearFourIndex].slice(-2);
  } else {
    arrayDateToFormat[tfYearFourIndex] = yearFourResult;
  }

  return arrayDateToFormat.join(toFormat[3]);
}

module.exports = formatDate;
