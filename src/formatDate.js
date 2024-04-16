'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat.pop();
  const separatorTo = toFormat.pop();
  const oldDateFormat = date.split(separatorFrom);
  const newDateFormat = [];
  const LONG_YEAR_FORMAT = 'YYYY';
  const SHORT_YEAR_FORMAT = 'YY';
  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const CENTURY_20 = '19';
  const CENTURY_21 = '20';

  let oldYearIndex = fromFormat.indexOf(LONG_YEAR_FORMAT);

  if (oldYearIndex === -1) {
    oldYearIndex = fromFormat.indexOf(SHORT_YEAR_FORMAT);
  }

  let newYearIndex = toFormat.indexOf(LONG_YEAR_FORMAT);

  if (newYearIndex === -1) {
    newYearIndex = toFormat.indexOf(SHORT_YEAR_FORMAT);
  }

  let year = oldDateFormat[oldYearIndex];
  const shortenedYear = year.slice(-2);

  if (toFormat.indexOf(SHORT_YEAR_FORMAT) !== -1) {
    year = shortenedYear;
    oldDateFormat[oldYearIndex] = year;
  }

  if (toFormat.indexOf(LONG_YEAR_FORMAT) !== -1) {
    year = shortenedYear > 20
      ? year = CENTURY_20 + shortenedYear
      : year = CENTURY_21 + shortenedYear;
  }

  const oldMonthIndex = fromFormat.indexOf(MONTH_FORMAT);
  const newMonthIndex = toFormat.indexOf(MONTH_FORMAT);
  const oldDayIndex = fromFormat.indexOf(DAY_FORMAT);
  const newDayIndex = toFormat.indexOf(DAY_FORMAT);

  newDateFormat[newYearIndex] = year;
  newDateFormat[newDayIndex] = oldDateFormat[oldDayIndex];
  newDateFormat[newMonthIndex] = oldDateFormat[oldMonthIndex];

  return newDateFormat.join(separatorTo);
}

module.exports = formatDate;
