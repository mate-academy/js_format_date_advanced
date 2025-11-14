'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  // write code here
  const oldSeparator = fromFormat[3];
  const parts = date.split(oldSeparator);

  const dateMap = {};

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = parts[i];
  }

  if (toFormat.includes('YY') && 'YYYY' in dateMap) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  if (toFormat.includes('YYYY') && 'YY' in dateMap) {
    const yy = Number(dateMap['YY']);

    dateMap['YYYY'] = yy < 30 ? '20' + dateMap['YY'] : '19' + dateMap['YY'];
  }

  const newParts = [
    dateMap[toFormat[0]],
    dateMap[toFormat[1]],
    dateMap[toFormat[2]],
  ];

  const finalDate = newParts.join(toFormat[3]);

  return finalDate;
}

module.exports = formatDate;
