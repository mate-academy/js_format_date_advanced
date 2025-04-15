'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];

  const keysFrom = fromFormat.slice(0, -1);
  const keysTo = toFormat.slice(0, -1);

  const parts = date.split(separatorFrom);
  const dateMap = {};

  keysFrom.forEach((key, index) => {
    dateMap[key] = parts[index];
  });

  if (dateMap.YYYY) {
    dateMap.YY = dateMap.YYYY.slice(2);
  }

  if (dateMap.YY && !dateMap.YYYY) {
    const year = parseInt(dateMap.YY, 10);

    dateMap.YYYY = (year >= 30 ? '19' : '20') + dateMap.YY;
  }

  const result = keysTo.map((key) => dateMap[key]);

  return result.join(separatorTo);
}

module.exports = formatDate;
