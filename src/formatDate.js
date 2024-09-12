'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDateArray = date.split(fromFormat[fromFormat.length - 1]);

  const yearIndex = fromFormat.findIndex(str => str.startsWith('Y'));

  let year = fromDateArray[yearIndex];

  const neededYearIndex = toFormat.findIndex(str => str.startsWith('Y'));

  if (fromFormat[yearIndex].length < toFormat[neededYearIndex].length) {
    year = year < 30 ? year.padStart(4, '20') : year.padStart(4, '19');
  }

  if (fromFormat[yearIndex].length > toFormat[neededYearIndex].length) {
    year = year.slice(2);
  }

  const month = fromDateArray[fromFormat.indexOf('MM')];
  const day = fromDateArray[fromFormat.indexOf('DD')];

  const neededMonthIndex = toFormat.indexOf('MM');
  const neededDayIndex = toFormat.indexOf('DD');

  const toDateArray = [];

  toDateArray[neededYearIndex] = year;
  toDateArray[neededMonthIndex] = month;
  toDateArray[neededDayIndex] = day;

  return toDateArray.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
