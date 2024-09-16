'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const getSeparate = fromFormat.pop();
  const needSeparate = toFormat.pop();
  const getDate = date.split(getSeparate);
  const result = {};

  for (let i = 0; i < getDate.length; i++) {
    result[fromFormat[i]] = getDate[i];
  }

  if (result['YYYY'] && toFormat.includes('YY')) {
    result['YY'] = result['YYYY'].slice(2);
  } else if (result['YY'] && toFormat.includes('YYYY')) {
    result['YYYY']
      = Number(result['YY']) < 30
      ? '20' + result['YY']
      : '19' + result['YY'];
  }

  return toFormat.map(x => result[x]).join(needSeparate);
}

module.exports = formatDate;
