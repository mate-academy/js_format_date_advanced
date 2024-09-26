'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const result = [];
  const arrayDate = date.split(fromFormat[fromFormat.length - 1]);
  const objectData = {};

  for (let i = 0; i < arrayDate.length; i++) {
    objectData[fromFormat[i]] = arrayDate[i];
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    const century = objectData['YY'] < 30 ? 20 : 19;

    objectData['YYYY'] = century + objectData['YY'];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    objectData['YY'] = objectData['YYYY'].slice(-2);
  }

  for (let j = 0; j < toFormat.length - 1; j++) {
    result.push(objectData[toFormat[j]]);
  }

  return result.join(toFormat[toFormat.length - 1]);
}

module.exports = formatDate;
