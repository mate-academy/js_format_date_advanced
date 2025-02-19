'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const SHORT_YEAR_FORMAT_LENGTH = 2;
  const LONG_YEAR_FORMAT_LENGTH = 4;
  const CENTURY_CHANGE_VALUE = 30;
  const NINETEENTH_CENTURY = 19;
  const TWENTIETH_CENTURY = 20;

  const oldSeparator = fromFormat[3];
  const oldDate = date.split(oldSeparator);
  const oldDayIndex = fromFormat.findIndex(el => el.includes('D'));
  const oldMonthIndex = fromFormat.findIndex(el => el.includes('M'));
  const oldYearIndex = fromFormat.findIndex(el => el.includes('Y'));

  const newSeparator = toFormat[3];
  const newDate = [null, null, null];
  const newDayIndex = toFormat.findIndex(el => el.includes('D'));
  const newMonthIndex = toFormat.findIndex(el => el.includes('M'));
  const newYearIndex = toFormat.findIndex(el => el.includes('Y'));

  const day = oldDate[oldDayIndex];
  const month = oldDate[oldMonthIndex];
  let year = oldDate[oldYearIndex];

  if (fromFormat[oldYearIndex].length === LONG_YEAR_FORMAT_LENGTH
    && toFormat[newYearIndex].length === SHORT_YEAR_FORMAT_LENGTH) {
    year = year.slice(SHORT_YEAR_FORMAT_LENGTH);
  }

  if (fromFormat[oldYearIndex].length === SHORT_YEAR_FORMAT_LENGTH
    && toFormat[newYearIndex].length === LONG_YEAR_FORMAT_LENGTH) {
    year = year < CENTURY_CHANGE_VALUE
      ? `${TWENTIETH_CENTURY}${year}`
      : `${NINETEENTH_CENTURY}${year}`;
  }

  newDate[newYearIndex] = year;
  newDate[newMonthIndex] = month;
  newDate[newDayIndex] = day;

  return newDate.join(newSeparator);
}

module.exports = formatDate;
