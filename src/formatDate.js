'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeperator = fromFormat[fromFormat.length - 1];
  const newSeperator = toFormat[toFormat.length - 1];
  const dateSplitted = date.split(oldSeperator);

  const assignOldDate = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    assignOldDate[fromFormat[i]] = dateSplitted[i];
  }

  if (assignOldDate.YY && !assignOldDate.YYYY) {
    const twoNumbersYear = parseInt(assignOldDate.YY, 10);

    const paddedTwoNumbersYear = assignOldDate.YY.padStart(2, '0');

    assignOldDate.YYYY =
      twoNumbersYear < 30
        ? `20${paddedTwoNumbersYear}`
        : `19${paddedTwoNumbersYear}`;
  }

  if (assignOldDate.YYYY && !assignOldDate.YY) {
    assignOldDate.YY = assignOldDate.YYYY.slice(-2);
  }

  const solution = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    const assignNewDate = toFormat[i];

    solution.push(assignOldDate[assignNewDate]);
  }

  return solution.join(newSeperator);
}

module.exports = formatDate;
