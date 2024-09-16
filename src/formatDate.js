'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateLength = fromFormat.length - 1;
  const iconSplit = fromFormat[dateLength];
  const iconJoin = toFormat[dateLength];
  const dateArr = date.split(iconSplit);
  const dateObj = {};
  const result = [];

  for (let i = 0; i < dateLength; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  }

  for (let j = 0; j < dateLength; j++) {
    if (dateObj[toFormat[j]]) {
      result.push(dateObj[toFormat[j]]);
    } else {
      if (toFormat[j] === 'YY') {
        result.push(dateObj['YYYY'].slice(-2));
      }

      if (toFormat[j] === 'YYYY') {
        if (dateObj['YY'] < 30) {
          result.push(`20${dateObj['YY']}`);
        } else {
          result.push(`19${dateObj['YY']}`);
        }
      }
    }
  }

  return result.join(iconJoin);
}

module.exports = formatDate;
