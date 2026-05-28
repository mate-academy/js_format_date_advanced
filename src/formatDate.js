'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const [, , , fromSeparator] = fromFormat;
  const [, , , toSeparator] = toFormat;

  const dateParts = date.split(fromSeparator);

  const fromMonthIndex = fromFormat.indexOf('MM');
  const toMonthIndex = toFormat.indexOf('MM');
  const fromDayIndex = fromFormat.indexOf('DD');
  const toDayIndex = toFormat.indexOf('DD');
  let fromYearIndex = 0;
  let toYearIndex = 0;

  if (fromFormat.includes('YY')) {
    fromYearIndex = fromFormat.indexOf('YY');
  } else if (fromFormat.includes('YYYY')) {
    fromYearIndex = fromFormat.indexOf('YYYY');
  }

  if (toFormat.includes('YY')) {
    toYearIndex = toFormat.indexOf('YY');
  } else if (toFormat.includes('YYYY')) {
    toYearIndex = toFormat.indexOf('YYYY');
  }

  const month = dateParts[fromMonthIndex];
  const day = dateParts[fromDayIndex];
  const fromYear = dateParts[fromYearIndex];
  let toYear = '';

  if (toFormat.includes('YY')) {
    toYear = fromYear.length === 2 ? fromYear : fromYear.slice(2);
  } else if (toFormat.includes('YYYY') && fromYear.length === 4) {
    toYear = fromYear;
  } else if (toFormat.includes('YYYY') && fromYear.length === 2) {
    toYear = fromYear < 30 ? '20' + fromYear : '19' + fromYear;
  }

  const result = [...toFormat];

  result[toMonthIndex] = month;
  result[toDayIndex] = day;
  result[toYearIndex] = toYear;

  return result.slice(0, -1).join(toSeparator);
}

module.exports = formatDate;
