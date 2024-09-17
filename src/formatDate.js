'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedDate = date.split(fromFormat[3]);

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');

  const oldYearIndex = fromFormat.includes('YYYY')
    ? fromFormat.indexOf('YYYY')
    : fromFormat.indexOf('YY');
  const oldYearLength = fromFormat[oldYearIndex].length;

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');

  const newYearIndex = toFormat.includes('YYYY')
    ? toFormat.indexOf('YYYY')
    : toFormat.indexOf('YY');
  const newYearLength = toFormat[newYearIndex].length;
  const newSeparator = toFormat[3];

  const newSplittedDate = [];

  newSplittedDate[newDayIndex] = splittedDate[oldDayIndex];
  newSplittedDate[newMonthIndex] = splittedDate[oldMonthIndex];
  newSplittedDate[newYearIndex] = splittedDate[oldYearIndex];

  const century = newSplittedDate[newYearIndex].slice(0, 3) < 30 ? 20 : 19;

  if (newYearLength < oldYearLength) {
    newSplittedDate[newYearIndex] = newSplittedDate[newYearIndex].slice(2);
  }

  if (newYearLength > oldYearLength) {
    newSplittedDate[newYearIndex] = century + newSplittedDate[newYearIndex];
  }

  return newSplittedDate.join(newSeparator);
}

module.exports = formatDate;
