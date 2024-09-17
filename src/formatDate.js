'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromDateArr = date.split(fromFormat[3]);

  const fromDayIndex = fromFormat.indexOf('DD');
  const fromMonthIndex = fromFormat.indexOf('MM');
  const fromYearLongIndex = fromFormat.indexOf('YYYY');
  const fromYearShortIndex = fromFormat.indexOf('YY');

  const toDayIndex = toFormat.indexOf('DD');
  const toMonthIndex = toFormat.indexOf('MM');
  const toYearLongIndex = toFormat.indexOf('YYYY');
  const toYearShortIndex = toFormat.indexOf('YY');
  let toYearIndex = null;

  const day = fromDateArr[fromDayIndex];
  const month = fromDateArr[fromMonthIndex];

  let fromYear = null;
  let toYear = null;

  if (fromYearLongIndex === -1) {
    fromYear = fromDateArr[fromYearShortIndex];

    if (toYearLongIndex === -1) {
      toYear = fromYear;
      toYearIndex = toYearShortIndex;
    } else {
      toYearIndex = toYearLongIndex;

      if (fromYear < 30) {
        toYear = '20' + fromYear;
      } else {
        toYear = '19' + fromYear;
      }
    }
  } else {
    fromYear = fromDateArr[fromYearLongIndex];

    if (toYearShortIndex === -1) {
      toYear = fromYear;
      toYearIndex = toYearLongIndex;
    } else {
      toYear = fromYear.slice(-2);
      toYearIndex = toYearShortIndex;
    }
  }

  const toDateArr = [];

  toDateArr[toDayIndex] = day;
  toDateArr[toMonthIndex] = month;
  toDateArr[toYearIndex] = toYear;

  return toDateArr.join(toFormat[3]);
}

module.exports = formatDate;
