'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dataMap = {};
  const newDateFormats = [];
  const dateParts = date.split(fromFormat.slice(3));

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dataMap[fromFormat[i]] = dateParts[i];
  }

  if (!fromFormat.includes('YY')) {
    dataMap.YY = dataMap.YYYY.slice(2);
  } else {
    const lonYearFormat = dataMap.YY < 30 ? 20 + dataMap.YY : 19 + dataMap.YY;

    dataMap.YYYY = lonYearFormat;
  }

  for (let i = 0; i < fromFormat.length - 1; i++) {
    newDateFormats.push(dataMap[toFormat[i]]);
  }

  return newDateFormats.join(toFormat.slice(3));
}

module.exports = formatDate;
