'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSep = fromFormat[fromFormat.length - 1];
  const toSep = toFormat[toFormat.length - 1];

  const parts = date.split(fromSep);
  const fromTokens = fromFormat.slice(0, -1);

  const valueMap = {};

  fromTokens.forEach((token, i) => {
    valueMap[token] = parts[i];
  });

  if (valueMap['YY'] !== undefined && valueMap['YYYY'] === undefined) {
    const yy = parseInt(valueMap['YY'], 10);

    valueMap['YYYY'] =
      (yy < 30 ? '20' : '19') + valueMap['YY'].padStart(2, '0');
  }

  if (valueMap['YYYY'] !== undefined && valueMap['YY'] === undefined) {
    valueMap['YY'] = valueMap['YYYY'].slice(-2);
  }

  return toFormat
    .slice(0, -1)
    .map((token) => valueMap[token])
    .join(toSep);
}

module.exports = formatDate;
