'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const formatOldDate = {};
  const separatorOldDate = fromFormat[3];
  const separatorNewDate = toFormat[3];
  const result = [];
  const splitDate = date.split(separatorOldDate);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    formatOldDate[fromFormat[i]] = splitDate[i];
  }

  let currentYear = 0;
  let currentYearKey = '';
  let currentYearLength = 0;

  for (let i = 0; i < fromFormat.length; i++) {
    if (fromFormat[i].includes('Y')) {
      currentYearKey = fromFormat[i];
      currentYear = formatOldDate[fromFormat[i]];
      currentYearLength = currentYearKey.length;
    }
  }

  for (let i = 0; i < toFormat.length - 1; i++) {
    if (toFormat[i] === 'DD' || toFormat[i] === 'MM') {
      result.push(formatOldDate[toFormat[i]]);
    } else if (toFormat[i].includes('Y')) {
      if (toFormat[i].length === currentYearLength) {
        result.push(currentYear);
      }

      if (toFormat[i].length === 2 && currentYearLength === 4) {
        result.push(Number(String(currentYear).slice(2)));
      }

      if (toFormat[i].length === 4 && currentYearLength === 2) {
        if (currentYear < 30) {
          result.push(Number('20' + String(currentYear)));
        } else {
          result.push(Number('19' + String(currentYear)));
        }
      }
    }
  }

  return result.join(separatorNewDate);
}

module.exports = formatDate;
