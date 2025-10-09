'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const TOKENS = ['YYYY', 'YY', 'MM', 'DD'];
  const getSepFromArray = (arr) => arr.find((el) => !TOKENS.includes(el));
  const getSepFromString = (str) => {
    for (let i = 0; i < str.length; i++) {
      if (str[i] < 'A' || str[i] > 'Z') {
        return str[i];
      }
    }

    return '';
  };
  const getSep = (fmt) =>
    Array.isArray(fmt) ? getSepFromArray(fmt) : getSepFromString(fmt);

  const sepFrom = getSep(fromFormat);
  const sepTo = getSep(toFormat);

  const fromParts = Array.isArray(fromFormat)
    ? fromFormat.filter((el) => el !== sepFrom)
    : fromFormat.split(sepFrom);
  const toParts = Array.isArray(toFormat)
    ? toFormat.filter((el) => el !== sepTo)
    : toFormat.split(sepTo);

  const values = date.split(sepFrom);
  const parts = {};

  fromParts.forEach((k, i) => (parts[k] = values[i]));

  if (!parts.YY && parts.YYYY) {
    parts.YY = parts.YYYY.slice(-2);
  }

  if (!parts.YYYY && parts.YY) {
    parts.YYYY = (+parts.YY < 30 ? '20' : '19') + parts.YY;
  }

  const normalizeYear = () => {
    if (toParts.includes('YYYY')) {
      return parts.YYYY || (+parts.YY < 30 ? '20' : '19') + parts.YY;
    }

    if (toParts.includes('YY')) {
      return parts.YY || (parts.YYYY ? parts.YYYY.slice(-2) : '');
    }

    return parts.YYYY || parts.YY || '';
  };
  const year = normalizeYear();

  return toParts
    .map((token) => (token.startsWith('Y') ? year : parts[token] || ''))
    .join(sepTo);
}

module.exports = formatDate;
