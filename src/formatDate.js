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
  let newFormatedDate = '';
  const oldSeparator = fromFormat[3];
  const splitedOldDate = date.split(oldSeparator);
  const dateMap = getDate(fromFormat, splitedOldDate);
  const newSeparator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    if (newFormatedDate.length) {
      newFormatedDate += newSeparator;
    }

    newFormatedDate += dateMap[toFormat[i]];
  }

  return newFormatedDate;
}

function getDate(format, dateArr) {
  const dateMap = {};
  const longYear = 'YYYY';
  const shortYear = 'YY';

  for (let i = 0; i < 3; i++) {
    dateMap[format[i]] = dateArr[i];

    if (format[i] === longYear) {
      dateMap[shortYear] = dateArr[i] % 100;
      continue;
    }

    if (format[i] === shortYear) {
      if (dateArr[i] < 30) {
        dateMap[longYear] = 2000 + +dateArr[i];
        continue;
      }

      dateMap[longYear] = 1900 + Number(dateArr[i]);
      continue;
    }
  }

  return dateMap;
}

module.exports = formatDate;
