'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const parts = date.split(fromSeparator);
  const result = [];

  let oldYearIndex = fromFormat.indexOf('YYYY');

  if (oldYearIndex === -1) {
    oldYearIndex = fromFormat.indexOf('YY');
  }

  let newYearIndex = toFormat.indexOf('YYYY');

  if (newYearIndex === -1) {
    newYearIndex = toFormat.indexOf('YY');
  }

  const oldMonthIndex = fromFormat.indexOf('MM');
  const newMonthIndex = toFormat.indexOf('MM');
  const oldDayIndex = fromFormat.indexOf('DD');
  const newDayIndex = toFormat.indexOf('DD');

  if (fromFormat[oldYearIndex].length > toFormat[newYearIndex].length) {
    parts[oldYearIndex] = parts[oldYearIndex].slice(-2);
  }

  if (fromFormat[oldYearIndex].length < toFormat[newYearIndex].length) {
    if (+parts[oldYearIndex] < 30) {
      parts[oldYearIndex] = `20${parts[oldYearIndex]}`;
    } else {
      parts[oldYearIndex] = `19${parts[oldYearIndex]}`;
    }
  }

  result[newYearIndex] = parts[oldYearIndex];
  result[newMonthIndex] = parts[oldMonthIndex];
  result[newDayIndex] = parts[oldDayIndex];

  return result.join(toSeparator);
}

module.exports = formatDate;
