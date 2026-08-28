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
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (dateMap.YYYY && !dateMap.YY) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  } else if (dateMap.YY && !dateMap.YYYY) {
    const yearNumber = Number(dateMap.YY);

    dateMap.YYYY = yearNumber < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  }

  const resultParts = [];

  for (let i = 0; i < 3; i++) {
    const targetKey = toFormat[i];

    resultParts.push(dateMap[targetKey]);
  }

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
