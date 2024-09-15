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
  const dateCollector = {};
  const newDateFormat = [];

  const THRESHOLD_YEAR = 30;
  const OUR_CENTURY = 20;
  const PREVIOUS_CENTURY = 19;

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateCollector[fromFormat[i]] = dateParts[i];
  }

  if (!fromFormat.includes('YY')) {
    dateCollector.YY = dateCollector.YYYY.slice(2);
  } else {
    dateCollector.YYYY = dateCollector.YY < THRESHOLD_YEAR
      ? OUR_CENTURY + dateCollector.YY
      : PREVIOUS_CENTURY + dateCollector.YY;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDateFormat.push(dateCollector[toFormat[i]]);
  }

  return newDateFormat.join(toFormat[3]);
}

module.exports = formatDate;
