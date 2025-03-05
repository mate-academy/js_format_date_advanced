'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];

  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const oldDate = date.split(fromSeparator);

  const oldDayIndex = fromFormat.indexOf('DD');
  const oldMonthIndex = fromFormat.indexOf('MM');
  const newDayIndex = toFormat.indexOf('DD');
  const newMonthIndex = toFormat.indexOf('MM');

  let oldYearIndex = '';
  let newYearIndex = '';

  if (fromFormat.includes('YYYY')) {
    oldYearIndex = fromFormat.indexOf('YYYY');
  } else {
    oldYearIndex = fromFormat.indexOf('YY');
  }

  if (toFormat.includes('YYYY')) {
    newYearIndex = toFormat.indexOf('YYYY');
  } else {
    newYearIndex = toFormat.indexOf('YY');
  }

  const day = oldDate[oldDayIndex];
  const month = oldDate[oldMonthIndex];
  let year = oldDate[oldYearIndex];

  if (fromFormat[oldYearIndex].length > toFormat[newYearIndex].length) {
    year = year[2] + year[3];
  }

  if (fromFormat[oldYearIndex].length < toFormat[newYearIndex].length) {
    if (+year < 30) {
      year = 20 + year;
    } else {
      year = 19 + year;
    }
  }

  result[newDayIndex] = day;
  result[newMonthIndex] = month;
  result[newYearIndex] = year;

  return result.join(toSeparator);
}

module.exports = formatDate;
