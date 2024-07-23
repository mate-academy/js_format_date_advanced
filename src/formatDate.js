'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataCollector = {};
  const newDateFormat = [];
  const dateParts = date.split(fromFormat.slice(3));

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dataCollector[fromFormat[i]] = dateParts[i];
  }

  if (!fromFormat.includes('YY')) {
    dataCollector.YY = dataCollector.YYYY.slice(2);
  } else {
    const lonYearFormat =
      dataCollector.YY < 30 ? 20 + dataCollector.YY : 19 + dataCollector.YY;

    dataCollector.YYYY = lonYearFormat;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDateFormat.push(dataCollector[toFormat[i]]);
  }

  return newDateFormat.join(toFormat.slice(3));
}

module.exports = formatDate;
