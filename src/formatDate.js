'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  let century = 20;
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const numbers = date.split(oldSeparator);
  let oldYearFull = false;
  let newYearFull = false;
  const oldDayIndex = fromFormat.indexOf('DD');
  const newDayIndex = toFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  const newMonthIndex = toFormat.indexOf('MM');
  let oldYearIndex, newYearIndex;

  if (fromFormat.includes('YYYY')) {
    oldYearFull = true;
    oldYearIndex = fromFormat.indexOf('YYYY');
  }

  if (toFormat.includes('YYYY')) {
    newYearFull = true;
    newYearIndex = toFormat.indexOf('YYYY');
  }

  if (oldYearFull === false) {
    oldYearIndex = fromFormat.indexOf('YY');

    if (Number(numbers[oldYearIndex]) >= 30) {
      century = 19;
    }
  }

  if (newYearFull === false) {
    newYearIndex = toFormat.indexOf('YY');
  }

  const reformatted = [0, 0, 0];

  reformatted[newDayIndex] = numbers[oldDayIndex];
  reformatted[newMonthIndex] = numbers[oldMonthIndex];

  if (oldYearFull === true && newYearFull === false) {
    reformatted[newYearIndex] = numbers[oldYearIndex].slice(-2);
  } else if (oldYearFull === false && newYearFull === true) {
    reformatted[newYearIndex] = (century + numbers[oldYearIndex]);
  } else {
    reformatted[newYearIndex] = numbers[oldYearIndex];
  }

  return reformatted.join(newSeparator);
}

module.exports = formatDate;
