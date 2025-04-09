'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  let result = date.split(fromFormat[3]);
  let fromYearIndex = 0;
  let fromMonthIndex = 0;
  let fromDayIndex = 0;
  let toYearIndex = 0;
  let toMonthIndex = 0;
  let toDayIndex = 0;
  const dateCopy = date.split(fromFormat[3]);

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i] === 'YYYY' || fromFormat[i] === 'YY') {
      fromYearIndex = i;
    } else if (fromFormat[i] === 'MM') {
      fromMonthIndex = i;
    } else if (fromFormat[i] === 'DD') {
      fromDayIndex = i;
    }
  }

  for (let i = 0; i < toFormat.length; i++) {
    if (toFormat[i] === 'YYYY' || toFormat[i] === 'YY') {
      toYearIndex = i;
    } else if (toFormat[i] === 'MM') {
      toMonthIndex = i;
    } else if (toFormat[i] === 'DD') {
      toDayIndex = i;
    }
  }

  result[toYearIndex] = dateCopy[fromYearIndex];
  result[toMonthIndex] = dateCopy[fromMonthIndex];
  result[toDayIndex] = dateCopy[fromDayIndex];

  if (fromFormat[fromYearIndex] === 'YYYY' && toFormat[toYearIndex] === 'YY') {
    result[toYearIndex] = result[toYearIndex].slice(-2);
  }

  if (fromFormat[fromYearIndex] === 'YY' && toFormat[toYearIndex] === 'YYYY') {
    if (parseInt(result[toYearIndex].slice(0, 2)) < 30) {
      result[toYearIndex] = '20' + result[toYearIndex];
    } else {
      result[toYearIndex] = '19' + result[toYearIndex];
    }
  }

  result = result.join(toFormat[3]);

  return result;
}

module.exports = formatDate;
