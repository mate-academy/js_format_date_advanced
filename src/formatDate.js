'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateParts = date.split(fromFormat[3]);
  let yearIndex = 0;
  let monthIndex = 0;
  let dayIndex = 0;
  const shortYearFormat = 'YY';
  const longYearFormat = 'YYYY';
  const maxYearCentury = 30;

  const result = [0, 0, 0];

  for (let i = 0; i <= 2; i++) {
    if (fromFormat[i] === shortYearFormat) {
      yearIndex = i;
    } else if (fromFormat[i] === longYearFormat) {
      yearIndex = i;
    }

    if (fromFormat[i] === 'DD') {
      dayIndex = i;
    }

    if (fromFormat[i] === 'MM') {
      monthIndex = i;
    }
  }

  for (let k = 0; k <= 2; k++) {
    if (toFormat[k] === shortYearFormat) {
      if (fromFormat[yearIndex] === longYearFormat) {
        result[k] = dateParts[yearIndex].slice(2);
      } else {
        result[k] = dateParts[yearIndex];
      }
    } else if (toFormat[k] === longYearFormat) {
      if (fromFormat[yearIndex] === shortYearFormat) {
        if (dateParts[yearIndex] >= maxYearCentury) {
          result[k] = 19 + dateParts[yearIndex];
        } else if (dateParts[yearIndex] < maxYearCentury) {
          result[k] = 20 + dateParts[yearIndex];
        }
      } else {
        result[k] = dateParts[yearIndex];
      }
    }

    if (toFormat[k] === 'DD') {
      result[k] = dateParts[dayIndex];
    }

    if (toFormat[k] === 'MM') {
      result[k] = dateParts[monthIndex];
    }
  }

  return result.join(toFormat[3]);
}

module.exports = formatDate;
