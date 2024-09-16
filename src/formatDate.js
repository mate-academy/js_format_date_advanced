'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splittedOldDate = date.split(fromFormat[3]);
  const toSeparator = toFormat[3];
  const formattedDate = [];

  const MONTH_FORMAT = 'MM';
  const DAY_FORMAT = 'DD';
  const CENTURY_19 = '19';
  const CENTURY_20 = '20';

  const oldDayIndex = fromFormat.indexOf(DAY_FORMAT);
  const oldMonthIndex = fromFormat.indexOf(MONTH_FORMAT);
  const oldYearIndex = fromFormat.length - 1 - (oldDayIndex + oldMonthIndex);

  const toDayIndex = toFormat.indexOf(DAY_FORMAT);
  const toMonthIndex = toFormat.indexOf(MONTH_FORMAT);
  const toYearIndex = toFormat.length - 1 - (toDayIndex + toMonthIndex);

  let normalizedYear = splittedOldDate[oldYearIndex];

  if (normalizedYear.length !== toFormat[toYearIndex].length) {
    if (normalizedYear.length > toFormat[toYearIndex].length) {
      normalizedYear = normalizedYear.slice(2);
    } else {
      if (+normalizedYear >= 30) {
        normalizedYear = CENTURY_19 + normalizedYear;
      } else {
        normalizedYear = CENTURY_20 + normalizedYear;
      }
    }
  }

  formattedDate[toDayIndex] = splittedOldDate[oldDayIndex];
  formattedDate[toYearIndex] = normalizedYear;
  formattedDate[toMonthIndex] = splittedOldDate[oldMonthIndex];

  return formattedDate.join(toSeparator);
}

module.exports = formatDate;
