'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldYearIndex = fromFormat.findIndex((elem) => elem.includes('YY'));
  const oldMonthIndex = fromFormat.indexOf('MM');
  const oldDayIndex = fromFormat.indexOf('DD');

  const newYearIndex = toFormat.findIndex((elem) => elem.includes('YY'));
  const newMonthIndex = toFormat.indexOf('MM');
  const newDayIndex = toFormat.indexOf('DD');

  const splitChar = fromFormat[3];
  const joinChar = toFormat[3];

  const dateArray = date.split(splitChar);

  const newArray = [...dateArray];

  if (
    fromFormat[oldYearIndex].length === 2 &&
    toFormat[newYearIndex].length === 4
  ) {
    if (dateArray[oldYearIndex].slice(-2) < 30) {
      newArray[newYearIndex] = '20' + dateArray[oldYearIndex].slice(-2);
    } else {
      newArray[newYearIndex] = '19' + dateArray[oldYearIndex];
    }
  } else if (
    fromFormat[oldYearIndex].length === 4 &&
    toFormat[newYearIndex].length === 2
  ) {
    newArray[newYearIndex] = dateArray[oldYearIndex].slice(-2);
  } else {
    newArray[newYearIndex] = dateArray[oldYearIndex];
  }

  newArray[newMonthIndex] = dateArray[oldMonthIndex];
  newArray[newDayIndex] = dateArray[oldDayIndex];

  return newArray.join(joinChar);
}

module.exports = formatDate;
