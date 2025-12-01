'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const saveData = {};

  const parts = date.split(fromFormat[3]);

  for (let i = 0; i < 3; i++) {
    saveData[fromFormat[i]] = parts[i];
  }

  if (saveData.YYYY !== undefined && toFormat.includes('YY')) {
    saveData.YY = saveData.YYYY.slice(2);
  }

  if (saveData.YY !== undefined && toFormat.includes('YYYY')) {
    const yyNum = Number(saveData.YY);

    saveData.YYYY = (yyNum < 30 ? '20' : '19') + saveData.YY.padStart(2, '0');
  }

  return toFormat
    .slice(0, 3)
    .map((part) => saveData[part])
    .join(toFormat[3]);
}

module.exports = formatDate;
