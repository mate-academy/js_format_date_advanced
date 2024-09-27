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

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateCollector[fromFormat[i]] = dateParts[i];
  }

  if (!fromFormat.includes('YY')) {
    dateCollector.YY = dateCollector.YYYY.slice(2);
  } else {
    const longYear
      = dateCollector.YY < 30 ? 20 + dateCollector.YY : 19 + dateCollector.YY;

    dateCollector.YYYY = longYear;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDateFormat.push(dateCollector[toFormat[i]]);
  }

  return newDateFormat.join(toFormat[3]);
}

module.exports = formatDate;
