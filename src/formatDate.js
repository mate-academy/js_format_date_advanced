'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparetor = fromFormat[3];

  const newSeparetor = toFormat[3];

  const oldDate = date.split(oldSeparetor);

  const newDate = [];

  const newDayIndex = toFormat.indexOf('DD');

  const newMonthIndex = toFormat.indexOf('MM');

  let newYearIndex = 0;

  let oldYearIndex = 0;

  if (fromFormat.includes('YY')) {
    oldYearIndex = fromFormat.indexOf('YY');
  }

  if (fromFormat.includes('YYYY')) {
    oldYearIndex = fromFormat.indexOf('YYYY');
  }

  if (toFormat.includes('YY')) {
    newYearIndex = toFormat.indexOf('YY');
  }

  if (toFormat.includes('YYYY')) {
    newYearIndex = toFormat.indexOf('YYYY');
  }

  newDate[newDayIndex] = oldDate[fromFormat.indexOf('DD')];

  newDate[newMonthIndex] = oldDate[fromFormat.indexOf('MM')];

  newDate[newYearIndex] = oldDate[oldYearIndex];

  if (fromFormat[oldYearIndex].length > toFormat[newYearIndex].length) {
    newDate[newYearIndex] = newDate[newYearIndex].slice(2);
  }

  if (fromFormat[oldYearIndex].length < toFormat[newYearIndex].length) {
    if (newDate[newYearIndex] >= 30) {
      newDate[newYearIndex] = '19' + newDate[newYearIndex];
    }

    if (newDate[newYearIndex] < 30) {
      newDate[newYearIndex] = '20' + newDate[newYearIndex];
    }
  }

  return newDate.join(newSeparetor);
}

module.exports = formatDate;
