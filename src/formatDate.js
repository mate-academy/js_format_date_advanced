'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const keysDates = {};
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const dateParts = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    keysDates[fromFormat[i]] = dateParts[i];
  }

  if (fromFormat.includes('YYYY') && toFormat.includes('YY')) {
    keysDates['YY'] = keysDates['YYYY'].slice(-2);
  }

  if (fromFormat.includes('YY') && toFormat.includes('YYYY')) {
    keysDates['YYYY'] = keysDates['YY'] < 30
      ? '20' + keysDates['YY'] : '19' + keysDates['YY'];
  }

  const newDates = toFormat.slice(0, -1).map(key => keysDates[key]);

  return newDates.join(newSeparator);
}

module.exports = formatDate;
