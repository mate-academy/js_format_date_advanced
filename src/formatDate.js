'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];
  const dateParts = date.split(fromSeparator);
  const partsMap = {};

  for (let i = 0; i < 3; i += 1) {
    partsMap[fromFormat[i]] = dateParts[i];
  }

  if (partsMap.YYYY) {
    partsMap.YY = partsMap.YYYY.slice(-2);
  } else if (partsMap.YY) {
    const century = Number(partsMap.YY) < 30 ? '20' : '19';

    partsMap.YYYY = `${century}${partsMap.YY}`;
  }

  const result = toFormat.slice(0, 3).map((token) => partsMap[token]);

  return result.join(toSeparator);
}

module.exports = formatDate;
