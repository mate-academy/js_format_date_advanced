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
  const newDate = [];
  const dateSet = {};

  for (let i = 0; i < 3; i++) {
    dateSet[fromFormat[i]] = dateParts[i];
  }

  if (dateSet.YYYY) {
    dateSet.YY = dateSet.YYYY.slice(2);
  }

  if (dateSet.YY < 30) {
    dateSet.YYYY = '20' + `${dateSet.YY}`;
  } else {
    dateSet.YYYY = '19' + `${dateSet.YY}`;
  }

  for (let i = 0; i < 3; i++) {
    newDate.push(dateSet[toFormat[i]]);
  }

  return newDate.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
