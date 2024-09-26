'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateArr = date.split(fromFormat[3]);
  const dateObj = {};

  for (let i = 0; i < dateArr.length; i++) {
    dateObj[fromFormat[i]] = dateArr[i];
  };

  const Y2 = 'YY';
  const Y4 = 'YYYY';

  if (fromFormat.includes(Y4) && !toFormat.includes(Y4)) {
    dateObj[Y2] = dateObj[Y4].slice(-2);
  };

  if (!fromFormat.includes(Y4) && toFormat.includes(Y4)) {
    if (+dateObj[Y2] < 30) {
      dateObj[Y4] = `20${dateObj[Y2]}`;
    } else {
      dateObj[Y4] = `19${dateObj[Y2]}`;
    }
  };

  const newDateArr = [];

  for (let i = 0; i < toFormat.length - 1; i++) {
    newDateArr.push(dateObj[toFormat[i]]);
  }

  return newDateArr.join(toFormat[3]);
}

module.exports = formatDate;
