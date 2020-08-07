'use strict';

/**
 * Here was many issues because of task description line length
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  let oldDivisor;

  let oldDayIndex;
  let oldYearIndex;
  let oldMonthIndex;

  let newDate = [];
  let newDayIndex;
  let newYearIndex;
  let newMonthIndex;
  let newDivisor;

  // get indexes of old format
  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      oldYearIndex = i;
    } else if (fromFormat[i].includes('M')) {
      oldMonthIndex = i;
    } else if (fromFormat[i].includes('D')) {
      oldDayIndex = i;
    } else {
      oldDivisor = fromFormat[i];
    }
  }

  // get indexes of new format
  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i].includes('Y')) {
      newYearIndex = i;
    } else if (toFormat[i].includes('M')) {
      newMonthIndex = i;
    } else if (toFormat[i].includes('D')) {
      newDayIndex = i;
    } else {
      newDivisor = toFormat[i];
    }
  }

  // get data to date variables
  const day = date.split(oldDivisor)[oldDayIndex];
  const month = date.split(oldDivisor)[oldMonthIndex];
  let year = date.split(oldDivisor)[oldYearIndex];

  // in case of old lenth of year and new length of year are different
  if (toFormat[newYearIndex].length > year.length) {
    if (+year > 20) {
      year = '19' + year;
    } else {
      year = '20' + year;
    }
  } else {
    year = year.slice(-toFormat[newYearIndex].length);
  }

  // make new date
  newDate[newDayIndex] = day;
  newDate[newMonthIndex] = month;
  newDate[newYearIndex] = year;
  newDate = newDate.join(newDivisor);

  return newDate;
}

module.exports = formatDate;
