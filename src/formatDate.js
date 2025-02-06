'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.pop();
  const dateParts = date.split(separator);

  const dateMap = {};

  for (let i = 0; i < fromFormat.length; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if ('YY' in dateMap && !(`YYYY` in dateMap)) {
    const year = dateMap.YY.padStart(2, '0');

    dateMap.YYYY = year < 30 ? `20${year}` : `19${year}`;
  }

  if (`YYYY` in dateMap && !('YY' in dateMap)) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  const newSeparator = toFormat.pop();

  return toFormat.map((part) => dateMap[part]).join(newSeparator);
}

module.exports = formatDate;
