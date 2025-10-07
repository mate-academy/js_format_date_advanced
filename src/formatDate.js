'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const getSepFromArray = (arr) => arr[arr.length - 1];
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
    ? fromFormat.slice(0, 3)
    : fromFormat.split(sepFrom);
  const toParts = Array.isArray(toFormat)
    ? toFormat.slice(0, 3)
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
