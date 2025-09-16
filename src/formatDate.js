'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const dateObj = {};
  const separatorFrom = fromFormat[fromFormat.length - 1];
  const separatorTo = toFormat[toFormat.length - 1];
  const dateDigits = date.split(separatorFrom);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateObj[fromFormat[i]] = dateDigits[i];
  }

  const result = [];

  for (let j = 0; j < toFormat.length - 1; j++) {
    let value;

    switch (toFormat[j]) {
      case 'YY':
        value = dateObj['YYYY'] ? dateObj['YYYY'].slice(-2) : dateObj['YY'];
        break;
      case 'YYYY':
        value = dateObj['YYYY']
          ? dateObj['YYYY']
          : dateObj['YY'] <= 29
            ? '20' + dateObj['YY']
            : '19' + dateObj['YY'];
        break;
      default:
        value = dateObj[toFormat[j]];
    }

    result.push(value);
  }

  return result.join(separatorTo);
}

module.exports = formatDate;
