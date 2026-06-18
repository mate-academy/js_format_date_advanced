'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separatorFrom = fromFormat[3];
  const separatorTo = toFormat[3];

  const dateParts = date.split(separatorFrom);
  const dateMap = {};

  for (let i = 0; i < fromFormat.length - 1; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if (toFormat.includes('YYYY') && fromFormat.includes('YY')) {
    const yearStr = dateMap['YY'];

    dateMap['YYYY'] = dateMap['YY'] < 30 ? '20' + yearStr : '19' + yearStr;
  }

  if (toFormat.includes('YY') && fromFormat.includes('YYYY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const newDate = [
    dateMap[toFormat[0]],
    dateMap[toFormat[1]],
    dateMap[toFormat[2]],
  ].join(separatorTo);

  return newDate;
  // write code here
}

module.exports = formatDate;
