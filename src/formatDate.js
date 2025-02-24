'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const separator = fromFormat.slice(-1).join('');
  const separatorFormat = toFormat.slice(-1).join('');
  const arrDate = date.split(separator);
  const data = {};

  for (let i = 0; i < 3; i++) {
    data[fromFormat[i]] = arrDate[i];
  }

  if ('YY' in data) {
    const dataNum = Number(data['YY']);

    data['YYYY'] = String(dataNum >= 30 ? 1900 + dataNum : 2000 + dataNum);

    delete data['YY'];
  }

  if (toFormat.includes('YY') && 'YYYY' in data) {
    data['YY'] = data['YYYY'].slice(-2);
  }

  return toFormat
    .slice(0, 3)
    .map((part) => data[part])
    .join(separatorFormat);
}

module.exports = formatDate;
