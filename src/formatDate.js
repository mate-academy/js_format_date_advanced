'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const LAST_CENTURY = '19';
  const CURRENT_CENTURY = '20';
  const CENTURY_DIVIDER = 30;
  const newDateByFormat = [];
  const dateDividerPosition = fromFormat.length - 1;

  const dateArr = date.split(fromFormat[dateDividerPosition]);
  const currentDateByFormat = {};

  for (let i = 0; i < dateArr.length; i++) {
    currentDateByFormat[fromFormat[i]] = dateArr[i];
  }

  if (currentDateByFormat.YY) {
    currentDateByFormat.YYYY = (currentDateByFormat.YY < CENTURY_DIVIDER)
      ? (CURRENT_CENTURY + currentDateByFormat.YY)
      : (LAST_CENTURY + currentDateByFormat.YY);
  } else {
    currentDateByFormat.YY = currentDateByFormat.YYYY.slice(-2);
  }

  for (let i = 0; i < dateArr.length; i++) {
    newDateByFormat.push(currentDateByFormat[toFormat[i]]);
  }

  return newDateByFormat.join(toFormat[dateDividerPosition]);
};

module.exports = formatDate;
