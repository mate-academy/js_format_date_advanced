'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const dateParts = date.split(oldSeparator);

  // Create a map of date components from the input
  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    const formatPart = fromFormat[i];

    dateMap[formatPart] = dateParts[i];
  }

  // Process year conversion if needed
  if (dateMap.YY && toFormat.includes('YYYY')) {
    const yy = parseInt(dateMap.YY, 10);

    dateMap.YYYY = yy < 30 ? `20${dateMap.YY}` : `19${dateMap.YY}`;
  } else if (dateMap.YYYY && toFormat.includes('YY')) {
    dateMap.YY = dateMap.YYYY.slice(-2);
  }

  const newParts = [];
  const newSeparator = toFormat[3];

  for (let i = 0; i < 3; i++) {
    const formatPart = toFormat[i];

    newParts.push(dateMap[formatPart]);
  }

  return newParts.join(newSeparator);
}

module.exports = formatDate;
