'use strict';

/**
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */
function formatDate(date, fromFormat, toFormat) {
  const fromSeparator = fromFormat[3];
  const toSeparator = toFormat[3];

  const parts = date.split(fromSeparator);

  const getFromPart = (token) => {
    const idx = fromFormat.indexOf(token);

    return idx === -1 ? undefined : parts[idx];
  };

  const fromYearToken = fromFormat.includes('YYYY') ? 'YYYY' : 'YY';
  const rawYear = getFromPart(fromYearToken);
  const month = getFromPart('MM') || '';
  const day = getFromPart('DD') || '';

  function convertYear(value, fromToken, toToken) {
    if (value === undefined) {
      return '';
    }

    const v = String(value);

    // YYYY -> YY
    if (fromToken === 'YYYY' && toToken === 'YY') {
      return v.slice(-2);
    }

    // YY -> YYYY
    if (fromToken === 'YY' && toToken === 'YYYY') {
      const num = Number(v);
      const padded = v.padStart(2, '0');

      return num < 30 ? '20' + padded : '19' + padded;
    }

    if (fromToken === 'YYYY' && toToken === 'YYYY') {
      return v;
    }

    if (fromToken === 'YY' && toToken === 'YY') {
      return v.padStart(2, '0');
    }

    return v;
  }

  const resultParts = toFormat.slice(0, 3).map((token) => {
    if (token === 'MM') {
      return month;
    }

    if (token === 'DD') {
      return day;
    }

    if (token === 'YYYY' || token === 'YY') {
      return convertYear(rawYear, fromYearToken, token);
    }

    return '';
  });

  return resultParts.join(toSeparator);
}

module.exports = formatDate;
