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
  const result = [];
  const oldSeparator = fromFormat[3];
  const oldDate = date.split(oldSeparator);
  const newSeparator = toFormat[3];
  let oldYearPosition = fromFormat.indexOf('YYYY');

  if (oldYearPosition === -1) {
    oldYearPosition = fromFormat.indexOf('YY');
  }

  let newYearPosition = toFormat.indexOf('YYYY');

  if (newYearPosition === -1) {
    newYearPosition = toFormat.indexOf('YY');
  }

  const oldMonthPosition = fromFormat.indexOf('MM');
  const oldDayPosition = fromFormat.indexOf('DD');
  const newMonthPosition = toFormat.indexOf('MM');
  const newDayPosition = toFormat.indexOf('DD');

  if (fromFormat[oldYearPosition].length > toFormat[newYearPosition].length) {
    oldDate[oldYearPosition] = oldDate[oldYearPosition].slice(-2);
  }

  if (fromFormat[oldYearPosition].length < toFormat[newYearPosition].length) {
    if (Number(oldDate[oldYearPosition]) < 30) {
      oldDate[oldYearPosition] = 20 + oldDate[oldYearPosition];
    } else {
      oldDate[oldYearPosition] = 19 + oldDate[oldYearPosition];
    }
  }
  result[newYearPosition] = oldDate[oldYearPosition];
  result[newMonthPosition] = oldDate[oldMonthPosition];
  result[newDayPosition] = oldDate[oldDayPosition];

  return result.join(newSeparator);
}

module.exports = formatDate;
