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
  const oldSeparator = fromFormat[3];
  const dateArray = date.split(oldSeparator);

  const newSeparator = toFormat[3];
  const dateResultArray = [null, null, null];

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  let oldYearIndex = null;
  let oldYearFormat = null;
  const oldYearInTwoIndex = fromFormat.indexOf('YY');
  const oldYearInFourIndex = fromFormat.indexOf('YYYY');

  if (oldYearInTwoIndex === -1) {
    oldYearIndex = oldYearInFourIndex;
    oldYearFormat = 'YYYY';
  } else {
    oldYearIndex = oldYearInTwoIndex;
    oldYearFormat = 'YY';
  }

  const day = dateArray[oldDayIndex];
  const month = dateArray[oldMonthIndex];
  const year = dateArray[oldYearIndex];

  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');
  let newYearIndex = null;
  let newYearFormat = null;
  const newYearInTwoIndex = toFormat.indexOf('YY');
  const newYearInFourIndex = toFormat.indexOf('YYYY');

  if (newYearInTwoIndex === -1) {
    newYearIndex = newYearInFourIndex;
    newYearFormat = 'YYYY';
  } else {
    newYearIndex = newYearInTwoIndex;
    newYearFormat = 'YY';
  }

  let yearAfterFormat = null;

  if (oldYearFormat === 'YYYY' && newYearFormat === 'YY') {
    yearAfterFormat = year.slice(-2);
  } else if (oldYearFormat === 'YY' && newYearFormat === 'YYYY') {
    if (year < 30) {
      yearAfterFormat = '20' + year;
    } else {
      yearAfterFormat = '19' + year;
    }
  } else {
    yearAfterFormat = year;
  }

  dateResultArray[newDayIndex] = day;
  dateResultArray[newMonthIndex] = month;
  dateResultArray[newYearIndex] = yearAfterFormat;

  return dateResultArray.join(newSeparator);
}

module.exports = formatDate;
