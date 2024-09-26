'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const splitterFrom = fromFormat[fromFormat.length - 1];
  const splitterTo = toFormat[toFormat.length - 1];
  const result = [];
  const newDate = date.split(splitterFrom);

  let fromYearIndex = 0;
  let fromMonthIndex = 0;
  let fromDayIndex = 0;

  let toYearIndex = 0;
  let toMonthIndex = 0;
  let toDayIndex = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    switch (fromFormat[i]) {
      case 'YYYY':
        fromYearIndex = i;
        break;
      case 'YY':
        if (newDate[i] >= 30) {
          newDate[i] = 1900 + Number(newDate[i]);
        } else {
          newDate[i] = 2000 + Number(newDate[i]);
        }
        fromYearIndex = i;
        break;
      case 'MM':
        fromMonthIndex = i;
        break;
      case 'DD':
        fromDayIndex = i;
        break;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    switch (toFormat[i]) {
      case 'YYYY':
        toYearIndex = i;
        break;
      case 'YY':
        newDate[i] = newDate[i] % 100;
        toYearIndex = i;
        break;
      case 'MM':
        toMonthIndex = i;
        break;
      case 'DD':
        toDayIndex = i;
        break;
    }
  }

  result[toYearIndex] = newDate[fromYearIndex];
  result[toDayIndex] = newDate[fromDayIndex];
  result[toMonthIndex] = newDate[fromMonthIndex];

  return result.join(splitterTo);
}

module.exports = formatDate;
