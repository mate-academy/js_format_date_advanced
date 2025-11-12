'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat.at(-1);
  const newSeparator = toFormat.at(-1);

  const dateParts = date.split(oldSeparator);

  const oldFormatIndices = { year: null, month: null, day: null };
  const newFormatIndices = { ...oldFormatIndices };

  // find indices of Date format both `fromFormat` (old) and `toFormat` (new)
  for (let i = 0; i < fromFormat.length - 1; i++) {
    setIndex(fromFormat, i, oldFormatIndices);
    setIndex(toFormat, i, newFormatIndices);
  }

  const oldFormatYearLength = fromFormat[oldFormatIndices.year].length;
  const newFormatYearLength = toFormat[newFormatIndices.year].length;

  if (oldFormatYearLength !== newFormatYearLength) {
    // from YYYY to YY
    if (oldFormatYearLength > newFormatYearLength) {
      dateParts[oldFormatIndices.year] =
        dateParts[oldFormatIndices.year].slice(2);
      // from YY to YYYY
    } else {
      const yearPrefix =
        Number.parseInt(dateParts[oldFormatIndices.year]) < 30 ? '20' : '19';

      dateParts[oldFormatIndices.year] =
        yearPrefix + dateParts[oldFormatIndices.year];
    }
  }

  const newDateFormat = [];

  newDateFormat[newFormatIndices.year] = dateParts[oldFormatIndices.year];
  newDateFormat[newFormatIndices.month] = dateParts[oldFormatIndices.month];
  newDateFormat[newFormatIndices.day] = dateParts[oldFormatIndices.day];

  return newDateFormat.join(newSeparator);

  function setIndex(formatArr, idx, target) {
    switch (formatArr[idx][0]) {
      case 'Y':
        target.year = idx;
        break;
      case 'M':
        target.month = idx;
        break;
      case 'D':
        target.day = idx;
        break;
      default:
        throw new Error(`Unknown date format ${formatArr[idx]}`);
    }
  }
}

module.exports = formatDate;
