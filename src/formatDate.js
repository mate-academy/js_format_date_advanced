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

  for (let i = 0; i < 3; i++) {
    dateMap[fromFormat[i]] = dateParts[i];
  }

  if ('YY' in dateMap) {
    const year = parseInt(dateMap['YY'], 10);

    dateMap['YYYY'] = year < 30 ? `20${dateMap['YY']}` : `19${dateMap['YY']}`;
  }

  if ('YYYY' in dateMap && toFormat.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  }

  const result = toFormat
    .slice(0, 3)
    .map((part) => dateMap[part])
    .join(separatorTo);

  return result;
}

module.exports = formatDate;
