'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromFormatCopy = [...fromFormat];
  const oldSeparator = fromFormatCopy.pop();
  const parts = date.split(oldSeparator);
  const dateMap = {};

  for (let i = 0; i < fromFormatCopy.length; i++) {
    dateMap[fromFormatCopy[i]] = parts[i];
  }

  if ('YY' in dateMap && !('YYYY' in dateMap)) {
    const year = parseInt(dateMap['YY'], 10);

    if (year < 30) {
      dateMap['YYYY'] = `20${dateMap['YY']}`;
    } else {
      dateMap['YYYY'] = `19${dateMap['YY']}`;
    }
  }

  if ('YYYY' in dateMap && !('YY' in dateMap)) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const toFormatCopy = [...toFormat];
  const newSeparator = toFormatCopy.pop();

  const newDate = toFormatCopy
    .map((part) => dateMap[part] || '')
    .join(newSeparator);

  return newDate;
}
module.exports = formatDate;
