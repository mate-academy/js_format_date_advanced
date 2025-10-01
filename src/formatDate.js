'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const tokenSet = new Set(['YYYY', 'YY', 'MM', 'DD']);
  const fromSep = fromFormat.find((el) => !tokenSet.has(el));
  const toSep = toFormat.find((el) => !tokenSet.has(el));

  const fromTokens = fromFormat.filter((el) => tokenSet.has(el));
  const toTokens = toFormat.filter((el) => tokenSet.has(el));

  const parts = [];
  let current = '';

  for (let i = 0; i < date.length; i++) {
    if (date[i] === fromSep) {
      parts.push(current);
      current = '';
    } else {
      current += date[i];
    }
  }
  parts.push(current);

  const dateMap = {};

  for (let i = 0; i < fromTokens.length; i++) {
    dateMap[fromTokens[i]] = parts[i];
  }

  if (fromTokens.includes('YYYY') && toTokens.includes('YY')) {
    dateMap['YY'] = dateMap['YYYY'].slice(-2);
  } else if (fromTokens.includes('YY') && toTokens.includes('YYYY')) {
    const n = +dateMap['YY'];

    if (n < 30) {
      dateMap['YYYY'] = '20' + dateMap['YY'];
    } else {
      dateMap['YYYY'] = '19' + dateMap['YY'];
    }
  }

  const result = [];

  for (let i = 0; i < toTokens.length; i++) {
    result.push(dateMap[toTokens[i]]);
  }

  return result.join(toSep);
}

module.exports = formatDate;
