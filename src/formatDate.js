'use strict';

/**
 * Time flies, standards change.
 * Let's get rid of the routine of changing the date format,
 * and create a function for formatting dates.
 * Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array variable,
 * and the new `toFormat` array variable.
 * Function returns given date in `toFormat` format.
 *
 * Example:
 * formatDate('2020-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 * // '18/02/20'
 * formatDate('2021-02-18', ['YYYY', 'MM', 'DD', '-'], ['DD', 'MM', 'YY', '/'])
 * // '18/02/21'
 * formatDate('97/02/18', ['YY', 'MM', 'DD', '/'], ['DD', 'MM', 'YYYY', '.']) /
 * / '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const dateArray = date.split(fromFormat[3]);
  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  const oldYearIndex = fromFormat.includes('YY')
    ? fromFormat.indexOf('YY')
    : fromFormat.indexOf('YYYY');

  const toDayIndex = toFormat.indexOf('DD');
  const toMonthIndex = toFormat.indexOf('MM');
  const toYearIndexTwoDigits = toFormat.indexOf('YY');
  const toYearIndex = toFormat.indexOf('YYYY');

  const separator = toFormat[3];

  const formattedDate = [];

  for (let i = 0; i < dateArray.length; i++) {
    switch (i) {
      case toDayIndex:
        formattedDate.push(dateArray[oldDayIndex]);
        break;
      case toMonthIndex:
        formattedDate.push(dateArray[oldMonthIndex]);
        break;
      case toYearIndexTwoDigits:
        fromFormat.includes('YY')
          ? formattedDate.push(dateArray[oldYearIndex])
          : formattedDate.push(dateArray[oldYearIndex].slice(-2));
        break;
      case toYearIndex:
        fromFormat.includes('YYYY')
          ? formattedDate.push(dateArray[oldYearIndex])
          : dateArray[oldYearIndex] > 21
            ? formattedDate.push(`19${dateArray[oldYearIndex]}`)
            : formattedDate.push(`20${dateArray[oldYearIndex]}`);
        break;
    }
  }

  return formattedDate.join(`${separator}`);
}

module.exports = formatDate;
