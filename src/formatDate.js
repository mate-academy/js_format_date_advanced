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
  const dateMap = {};

  for (let i = 0; i < fromFormat.length; i++) {
    const element = fromFormat[i];

    if (
      element === 'YYYY' ||
      element === 'YY' ||
      element === 'MM' ||
      element === 'DD'
    ) {
      dateMap[element] = dateParts[i];
    }
  }

  let newDate = '';
  const newSeparator = toFormat[3];

  for (let i = 0; i < toFormat.length - 1; i++) {
    let part = toFormat[i];

    if (part === 'YY') {
      if (dateMap.YYYY) {
        part = dateMap.YYYY.slice(2);
      } else if (dateMap.YY) {
        part = dateMap.YY;
      }
    } else if (part === 'YYYY') {
      if (dateMap.YY) {
        part = Number(dateMap.YY) < 30 ? '20' + dateMap.YY : '19' + dateMap.YY;
      } else if (dateMap.YYYY) {
        part = dateMap.YYYY;
      }
    } else {
      part = dateMap[part];
    }

    newDate += part;

    if (i < toFormat.length - 2) {
      newDate += newSeparator;
    }
  }

  return newDate;
}

module.exports = formatDate;
